import {ProductDTO} from "#application/dto/ProductDTO.ts";
import {CustomerOrderDTO} from "#application/dto/CustomerOrderDTO.ts";


export interface OrderItemDTO {
    id: string;
    quantity: number;
    price: number;
    order: CustomerOrderDTO;
    products: ProductDTO;
}