import BulkUploadItem from "#models/BulkUploadItem.ts";

export interface BulkUploadItemRepositoryInterface {
    findBulkUploadItemByBatchId(batchId: string): Promise<BulkUploadItem[]>
}