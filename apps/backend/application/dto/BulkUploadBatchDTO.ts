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