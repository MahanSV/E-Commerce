import {CategoryDTO} from "#application/dto/CategoryDTO.ts";
import {OrderItemDTO} from "#application/dto/OrderItemDTO.ts";
import {WishlistDTO} from "#application/dto/WishListDTO.ts";
import {MerchantProductDTO} from "#application/dto/MerchantProductDTO.ts";

export interface ProductDTO {
    id: string;
    categoryId: string;
    title: string;
    slug: string;
    manufacturer: string;
    photo?: any[];
    inStock: boolean;
    price: number;
    rating: number;
    quantity: number;
    SKU?: string;
    socialLink?: string;
    description?: string;
    information?: string;
    wishlists?: WishlistDTO[];
    merchantProducts?: MerchantProductDTO[];
    category: CategoryDTO;
    orderItems?: OrderItemDTO[];
}

export interface ProductImageDTO {
    productID: string;
    imageID: string;
    image: string;
}