import BulkUploadBatch from "#models/BulkUploadBatch.ts";
import {updateBatchItemsCommand} from "#application/types/bulkUpload/command.js";

export interface BulkUploadBatchRepositoryInterface {
    uploadCsvAndCreateBatch(csvFile: any): Promise<BulkUploadBatch>
    listBatches(): Promise<BulkUploadBatch[]>
    findById(id: string): Promise<BulkUploadBatch | null>
    updateBatchItems(command: updateBatchItemsCommand): Promise<{
        error: string | null;
        id: string;
        status: string;
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
    }[]>
    // Delete batch + items + products
    deleteBatchAndItemsAndProducts(batchId: string): Promise<{
        success: boolean;
        message: string;
        deletedProducts: boolean;
    }>
    // Delete batch + items only, keep products
    deleteBatchAndItems(batchId: string): Promise<{
        success: boolean;
        message: string;
        deletedProducts: boolean;
    }>
    // متد مدیریت تراکنش‌ها
    executeTransaction<T>(callback: (tx: any) => Promise<T>): Promise<T>;
    // متدهای مربوط به Batch
    createBatch(tx: any, data: any): Promise<any>;
    updateBatch(tx: any, batchId: string, data: any): Promise<any>;
    getBatchSummary(batchId: string): Promise<any>;

    // متدهای مربوط به Category
    findCategories(tx: any, uniqueCategoryIds: string[]): Promise<any[]>;

    // متدهای مربوط به Product
    createProduct(tx: any, data: any): Promise<any>;

    // متدهای مربوط به BulkUploadItem
    createBulkUploadItem(tx: any, data: any): Promise<any>;
}
