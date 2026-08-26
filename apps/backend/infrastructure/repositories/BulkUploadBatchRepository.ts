import { BulkUploadBatchRepositoryInterface } from "#domain/interfaces/BulkUploadBatchRepository.ts";
import { BaseRepository } from "#repositories/BaseRepository.ts";
import BulkUploadBatch from "#models/BulkUploadBatch.ts";
import prisma from "#context/dbContext/prisma/client.ts";
import {updateBatchItemsCommand} from "#application/types/bulkUpload/command.ts";
import {BulkUploadItemStatus} from "#domain/enums/bulkUploadItemStatus.ts";

export default class BulkUploadBatchRepository extends BaseRepository<BulkUploadBatch> implements BulkUploadBatchRepositoryInterface {
    constructor() {
        super(BulkUploadBatch.createFromSnapshot);
    };

    async uploadCsvAndCreateBatch(csvFile: any): Promise<any> {};

    async listBatches(): Promise<BulkUploadBatch[]> {
        const dataModels = await prisma.bulkUploadBatch.findMany({
            orderBy: { createdAt: "desc" },
        });

        return dataModels.map(data => BulkUploadBatch.createFromSnapshot(data));
    };

    async findById(id: string): Promise<BulkUploadBatch | null> {
        const dataModel = await prisma.bulkUploadBatch.findUnique({
            where: { id },
        });

        return dataModel && BulkUploadBatch.createFromSnapshot(dataModel);
    };

    async updateBatchItems(command: updateBatchItemsCommand): Promise<{
        error: string | null;
        id: string;
        status: BulkUploadItemStatus;
        batchId: string;
        productId: string | null;
        title: string;
        slug: string;
        price: number;
        manufacturer: string | null;
        description: string | null;
        mainImage: string | null;
        categoryId: string;
        inStock: number;
    }[]> {
        const ids = command.items.map(item => item.itemId);

        const dataModels = await prisma.$transaction(async (tx) => {
            tx.bulkUploadItem.findMany({
                where: { id: { in: ids }, batchId: command.batchId },
                select: { id: true, productId: true },
            });

            const byId = new Map(command.items.map((i) => [i.itemId, i]));
            const result = [];

            for (const item of command.items) {
                const current = byId.get(item.itemId);
                if (!current) continue;

                const price = Math.round(Number(item.price));
                const inStock = Number(item.inStock) === 1 ? 1 : 0;

                if (current.productId) {
                    await tx.product.update({
                        where: { id: current.productId },
                        data: { price, inStock },
                    });
                }

                const updatedItem = await tx.bulkUploadItem.update({
                    where: {
                        id: item.itemId
                    },
                    data: {
                        price,
                        inStock,
                        status: "UPDATED",
                        error: null
                    }
                });

                result.push(updatedItem);
            }

            return result;
        });

        return dataModels;
    };

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