import BulkUploadBatch from "#models/BulkUploadBatch.ts";

export interface BulkUploadRepositoryInterface {
    uploadCsvAndCreateBatch(csvFile: any): Promise<BulkUploadBatch>
    listBatches(): Promise<BulkUploadBatch[]>
    getBatchDetail(batchId: string): Promise<BulkUploadBatch>
    updateBatchItems(batchId: string, items: string): Promise<BulkUploadBatch>
    deleteBatch(batchId: string, deleteProducts: boolean): Promise<BulkUploadBatch>
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
