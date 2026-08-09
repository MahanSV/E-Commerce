import {ProductDTO} from "#application/dto/ProductDTO.ts";
import {MerchantDTO} from "#application/dto/MerchantDTO.ts";


export interface MerchantProductDTO {
    id: string;
    merchantId: string;
    productId: string;
    merchant?: MerchantDTO;
    product?: ProductDTO;
}