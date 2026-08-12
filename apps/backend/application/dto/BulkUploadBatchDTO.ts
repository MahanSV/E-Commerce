import {UserDTO} from "#application/dto/UserDTO.ts";
import {BulkUploadItemDTO} from "#application/dto/BulkUploadItemDTO.ts";

export interface BulkUploadBatchDTO {
    id: string;
    fileName?: string
    createdAt: Date;
    status: string;
    itemCount: number;
    errorCount: number;
    userId?: string;
    items?: BulkUploadItemDTO[];
    user?: UserDTO;
}