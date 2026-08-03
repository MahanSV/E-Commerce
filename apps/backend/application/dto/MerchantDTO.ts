import {ProductDTO} from "#application/dto/ProductDTO.ts";

export interface MerchantDTO {
    id: string;
    name: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
    products?: ProductDTO[];
}