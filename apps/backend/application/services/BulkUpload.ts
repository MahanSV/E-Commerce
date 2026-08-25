import { BulkUploadServiceInterface } from "#application/interfaces/BulkUploadInterface.ts";
import { BulkUploadRepositoryInterface } from "#domain/interfaces/BulkUploadBatchRepository.ts";
import BulkUploadBatchRepository from "#repositories/BulkUploadBatchRepository.ts";
import { excelCsvBufferToJSON, normalizeXlsxToCsvRows } from "#substructure/utils/excel.ts";
import ApiError from "#webhost/errors/apiError.ts";
import httpStatus from "http-status";

interface CleanRowData {
    title: string;
    slug: string;
    price: number;
    categoryId: string;
    inStock: number;
    manufacturer: string | null;
    description: string | null;
    mainImage: string | null;
}

interface ValidationResult {
    ok: boolean;
    data?: CleanRowData;
    error?: string;
}

export default class BulkUploadService implements BulkUploadServiceInterface {
    private bulkUploadRepository: BulkUploadRepositoryInterface;

    constructor(bulkUploadRepository: BulkUploadRepositoryInterface = new BulkUploadBatchRepository()) {
        this.bulkUploadRepository = bulkUploadRepository;
    };

    public async uploadCsvAndCreateBatch(csvFile: Express.Multer.File): Promise<any> {
        // ۱. پارس کردن فایل
        const parsedData = excelCsvBufferToJSON(csvFile.buffer);
        const rows = normalizeXlsxToCsvRows(parsedData);

        if (!rows || rows.length === 0) {
            throw new ApiError(httpStatus.BAD_REQUEST, "CSV has no rows", "Error");
        }

        const valid: CleanRowData[] = [];
        const errors: { index: number; error: string }[] = [];

        for (let i = 0; i < rows.length; i++) {
            const { ok, data, error } = this.validateRow(rows[i]);
            if (ok && data) {
                valid.push(data);
            } else if (error) {
                errors.push({ index: i + 1, error });
            }
        }

        const result = await this.bulkUploadRepository.executeTransaction(async (tx: any) => {
            const createdBatch = await this.bulkUploadRepository.createBatch(tx, {
                fileName: csvFile.originalname,
                status: "PENDING",
                itemCount: rows.length,
                errorCount: errors.length,
            });

            const { successCount, errorCount } = await this.createBatchWithItems(
                tx,
                createdBatch.id,
                valid,
                errors
            );

            const finalStatus = this.computeBatchStatus(successCount, errorCount);
            const batch = await this.bulkUploadRepository.updateBatch(tx, createdBatch.id, {
                status: finalStatus,
                itemCount: successCount + errorCount,
                errorCount,
            });

            return batch;
        });

        const summary = await this.bulkUploadRepository.getBatchSummary(result.id);

        return {
            batchId: result.id,
            status: result.status,
            ...summary,
            validationErrors: errors,
        };
    };

    async listBatches(): Promise<any> {};
    async getBatchDetail(batchId: string): Promise<any> {};
    async updateBatchItems(batchId: string, items: string): Promise<any> {};
    async deleteBatch(batchId: string, deleteProducts: boolean): Promise<any> {};

    // متد اعتبارسنجی
    private validateRow(row: Record<string, string>): ValidationResult {
        const errs: string[] = [];
        const clean: Partial<CleanRowData> = {};

        const title = String(row.title ?? "").trim();
        const slug = String(row.slug ?? "").trim();
        const price = Number(row.price);
        const categoryId = String(row.categoryId ?? "").trim();
        const inStock = Number(row.inStock ?? 0);

        if (!title) errs.push("title is required");
        if (!slug) errs.push("slug is required");
        if (!Number.isFinite(price) || price < 0) errs.push("price must be a non-negative number");
        if (!categoryId) errs.push("categoryId is required");
        if (!Number.isFinite(inStock) || inStock < 0) errs.push("inStock must be a non-negative number");

        if (errs.length) return { ok: false, error: errs.join(", ") };

        clean.title = title;
        clean.slug = slug;
        clean.price = Math.round(price * 100) / 100;
        clean.categoryId = categoryId;
        clean.inStock = Math.floor(inStock);
        clean.manufacturer = row.manufacturer ? String(row.manufacturer).trim() : null;
        clean.description = row.description ? String(row.description).trim() : null;
        clean.mainImage = row.mainImage ? String(row.mainImage).trim() : null;

        return { ok: true, data: clean as CleanRowData };
    };

    // منطق بیزینسی ساخت آیتم‌ها (بدون کوئری مستقیم دیتابیس)
    private async createBatchWithItems(
        tx: any,
        batchId: string,
        validRows: CleanRowData[],
        errorRows: { index: number; error: string }[]
    ): Promise<{ successCount: number; errorCount: number }> {
        const uniqueCategoryIds = [...new Set(validRows.map((r) => r.categoryId))];

        // کوئری از طریق ریپازیتوری
        const categories = await this.bulkUploadRepository.findCategories(tx, uniqueCategoryIds);

        const categoryMap = new Map<string, string>();
        categories.forEach((cat: any) => {
            categoryMap.set(cat.id, cat.id);
            if (cat.name) categoryMap.set(cat.name.toLowerCase(), cat.id);
        });

        let success = 0;
        let failed = 0;

        // مدیریت ردیف‌های معتبر
        for (const row of validRows) {
            const resolvedCategoryId =
                categoryMap.get(row.categoryId) ||
                (row.categoryId ? categoryMap.get(row.categoryId.toLowerCase()) : undefined);

            if (!resolvedCategoryId) {
                await this.bulkUploadRepository.createBulkUploadItem(tx, {
                    batchId, title: row.title, slug: row.slug, price: row.price,
                    manufacturer: row.manufacturer, description: row.description,
                    mainImage: row.mainImage, categoryId: row.categoryId, inStock: row.inStock,
                    status: "ERROR", error: `Category not found: ${row.categoryId}`,
                });
                failed++;
                continue;
            }

            try {
                const product = await this.bulkUploadRepository.createProduct(tx, {
                    title: row.title, slug: row.slug, price: row.price, rating: 5,
                    description: row.description ?? "", manufacturer: row.manufacturer ?? "",
                    mainImage: row.mainImage ?? "", categoryId: resolvedCategoryId, inStock: row.inStock,
                });

                await this.bulkUploadRepository.createBulkUploadItem(tx, {
                    batchId, productId: product.id, title: row.title, slug: row.slug, price: row.price,
                    manufacturer: row.manufacturer, description: row.description, mainImage: row.mainImage,
                    categoryId: resolvedCategoryId, inStock: row.inStock, status: "CREATED", error: null,
                });
                success++;
            } catch (e: any) {
                await this.bulkUploadRepository.createBulkUploadItem(tx, {
                    batchId, title: row.title, slug: row.slug, price: row.price,
                    manufacturer: row.manufacturer, description: row.description, mainImage: row.mainImage,
                    categoryId: resolvedCategoryId || row.categoryId, inStock: row.inStock,
                    status: "ERROR", error: e?.message || "Create failed",
                });
                failed++;
            }
        }

        // مدیریت ردیف‌های نامعتبر
        for (const err of errorRows) {
            await this.bulkUploadRepository.createBulkUploadItem(tx, {
                batchId, title: "", slug: "", price: 0, manufacturer: null,
                description: null, mainImage: null, categoryId: "", inStock: 0,
                status: "ERROR", error: `Row ${err.index}: ${err.error}`,
            });
            failed++;
        }

        return { successCount: success, errorCount: failed };
    };

    // منطق محاسبه وضعیت نهایی
    private computeBatchStatus(successCount: number, errorCount: number): string {
        if (successCount > 0 && errorCount === 0) return "COMPLETED";
        if (successCount > 0 && errorCount > 0) return "PARTIAL";
        if (successCount === 0 && errorCount > 0) return "FAILED";
        return "PENDING";
    };
}