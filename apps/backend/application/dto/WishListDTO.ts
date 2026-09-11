import {UserDTO} from "#application/dto/UserDTO.ts";
import {ProductDTO} from "#application/dto/ProductDTO.ts";

export interface WishlistDTO {
    id: string;
    productId: string;
    userId: string;
    user?: UserDTO;
    product?: ProductDTO;
}