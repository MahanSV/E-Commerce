import {ProductDTO} from "#application/dto/ProductDTO.ts";

export interface CategoryDTO {
    id: string;
    name: string;
    products?: ProductDTO[];
}