import {ProductDTO} from "#application/dto/ProductDTO.ts";
import {BulkUploadBatchDTO} from "#application/dto/BulkUploadBatchDTO.ts";
import {BulkUploadItemStatus} from "#domain/enums/bulkUploadItemStatus.ts";


export interface BulkUploadItemDTO {
    id: string;
    batchId?: string;
    productId?: string;
    title: string;
    slug: string;
    price: number;
    manufacturer?: string;
    description?: string;
    mainImage?: string;
    categoryId: string;
    inStock: number;
    status: BulkUploadItemStatus;
    error?: string;
    batch?: BulkUploadBatchDTO;
    product?: ProductDTO;
}