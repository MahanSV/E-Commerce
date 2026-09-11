import BulkUploadItem from "#models/BulkUploadItem.ts";

export interface BulkUploadItemRepositoryInterface {
    findBulkUploadItemByBatchId(batchId: string): Promise<BulkUploadItem[]>
    findItemsByBatchIdWithProducts(batchId: string): Promise<BulkUploadItem[]>
    getNonNullProductIdsByBatchId(batchId: string): Promise<BulkUploadItem[]>
}