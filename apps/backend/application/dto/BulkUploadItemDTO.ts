import {ProductDTO} from "#application/dto/ProductDTO.ts";
import {BulkUploadBatchDTO} from "#application/dto/BulkUploadBatchDTO.ts";


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
    status: string;
    error?: string;
    batch: BulkUploadBatchDTO;
    product: ProductDTO
}