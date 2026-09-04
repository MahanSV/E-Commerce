import {UserDTO} from "#application/dto/UserDTO.ts";
import {BulkUploadItemDTO} from "#application/dto/BulkUploadItemDTO.ts";
import {BulkUploadBatchStatus} from "#domain/enums/bulkUploadBatchStatus.ts";

export interface BulkUploadBatchDTO {
    id: string;
    fileName?: string
    createdAt: Date;
    status: BulkUploadBatchStatus;
    itemCount: number;
    errorCount: number;
    userId?: string;
    items?: BulkUploadItemDTO[];
    user?: UserDTO;
}

export interface BulkUploadBatchReportDTO {
    batches: Awaited<{
        id: string;
        fileName: string;
        totalRecords: number;
        successfulRecords: number;
        failedRecords: number;
        status: BulkUploadBatchStatus;
        uploadedBy: string;
        uploadedAt: Date;
        errors: (string | undefined)[] | undefined
    }> [];
}

export interface BulkUploadBatchDetailDTO {
    batch: BulkUploadBatchDTO;
    items?: BulkUploadItemDTO[];
}