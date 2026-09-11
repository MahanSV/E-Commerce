import {CategoryDTO} from "#application/dto/CategoryDTO.ts";
import {OrderItemDTO} from "#application/dto/OrderItemDTO.ts";
import {WishlistDTO} from "#application/dto/WishListDTO.ts";
import {MerchantProductDTO} from "#application/dto/MerchantProductDTO.ts";
import {BulkUploadItemDTO} from "#application/dto/BulkUploadItemDTO.ts";

export interface ProductDTO {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    price: number;
    rating: number;
    description?: string;
    manufacturer: string;
    inStock: number;
    photo?: any[];
    merchantId?: string;
    categoryId: string;
    quantity: number;
    SKU?: string;
    socialLink?: string;
    information?: string;
    wishlists?: WishlistDTO[];
    merchantProducts?: MerchantProductDTO[];
    category?: CategoryDTO;
    orderItems?: OrderItemDTO[];
    bulkUploadItems?: BulkUploadItemDTO[];
}

export interface ProductImageDTO {
    productID: string;
    imageID: string;
    image: string;
}