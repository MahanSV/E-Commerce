import { BulkUploadBatchRepositoryInterface } from "#domain/interfaces/BulkUploadBatchRepository.ts";
import { BaseRepository } from "#repositories/BaseRepository.ts";
import BulkUploadBatch from "#models/BulkUploadBatch.ts";
import prisma from "#context/dbContext/prisma/client.ts";

export default class BulkUploadBatchRepository extends BaseRepository<BulkUploadBatch> implements BulkUploadBatchRepositoryInterface {
    constructor() {
        super(BulkUploadBatch.createFromSnapshot);
    }

    // متدهای خالی آینده
    async uploadCsvAndCreateBatch(csvFile: any): Promise<any> {};
    async listBatches(): Promise<any> {};
    async getBatchDetail(batchId: string): Promise<any> {};
    async updateBatchItems(batchId: string, items: string): Promise<any> {};
    async deleteBatch(batchId: string, deleteProducts: boolean): Promise<any> {};

    // مدیریت تراکنش‌ها فقط در ریپازیتوری
    async executeTransaction<T>(callback: (tx: any) => Promise<T>): Promise<T> {
        return prisma.$transaction(callback);
    };

    async createBatch(tx: any, data: any): Promise<any> {
        return tx.bulkUploadBatch.create({ data });
    };

    async updateBatch(tx: any, batchId: string, data: any): Promise<any> {
        return tx.bulkUploadBatch.update({
            where: { id: batchId },
            data
        });
    };

    async findCategories(tx: any, uniqueCategoryIds: string[]): Promise<any[]> {
        return tx.category.findMany({
            where: {
                OR: [
                    { id: { in: uniqueCategoryIds } },
                    { name: { in: uniqueCategoryIds } },
                ],
            },
            select: { id: true, name: true },
        });
    };

    async createProduct(tx: any, data: any): Promise<any> {
        return tx.product.create({ data });
    };

    async createBulkUploadItem(tx: any, data: any): Promise<any> {
        return tx.bulkUploadItem.create({ data });
    };

    async getBatchSummary(batchId: string): Promise<any> {
        const total = await prisma.bulkUploadItem.count({ where: { batchId } });
        const errors = await prisma.bulkUploadItem.count({ where: { batchId, status: "ERROR" } });
        const created = await prisma.bulkUploadItem.count({ where: { batchId, status: "CREATED" } });
        const updated = await prisma.bulkUploadItem.count({ where: { batchId, status: "UPDATED" } });

        return { total, errors, created, updated };
    };
}