import {BulkUploadBatchDetailDTO, BulkUploadBatchReportDTO} from "#application/dto/BulkUploadBatchDTO.ts";
import {updateBatchItemsCommand} from "#application/types/bulkUpload/command.ts";

export interface BulkUploadBatchServiceInterface {
    uploadCsvAndCreateBatch(csvFile: Express.Multer.File): Promise<any>
    listBatches(): Promise<Awaited<BulkUploadBatchReportDTO[]>>
    getBatchDetail(batchId: string): Promise<BulkUploadBatchDetailDTO>
    updateBatchItems(command: updateBatchItemsCommand): Promise<{updatedCount: number, items: {
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
        }[]}>
    deleteBatch(batchId: string, deleteProducts: boolean): Promise<any>
}