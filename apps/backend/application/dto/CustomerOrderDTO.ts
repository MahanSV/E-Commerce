import {ProductDTO} from "#application/dto/ProductDTO.ts";


export interface CustomerOrderDTO {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    company: string;
    adress: string;
    apartment: string;
    postalCode: string;
    dateTime?: Date;
    status: string;
    city: string;
    country: string;
    orderNotice: string;
    total: number;
    products?: ProductDTO[];
}