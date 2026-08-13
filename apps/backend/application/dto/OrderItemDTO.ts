import {ProductDTO} from "#application/dto/ProductDTO.ts";
import {CustomerOrderDTO} from "#application/dto/CustomerOrderDTO.ts";


export interface OrderItemDTO {
    id: string;
    quantity: number;
    price: number;
    customerOrder: CustomerOrderDTO;
    products: ProductDTO;
}

// POST /api/order-product — ریسپانس ساخت (doc)
export interface CreateOrderProductDTO {
    id: string;
    customerOrderId: string;
    productId: string;
    quantity: number;
}

// GET /api/order-product/:id — هر line item (doc)
export interface OrderProductDTO {
    id: string;
    customerOrderId: string;
    productId: string;
    quantity: number;
    product: ProductDTO;
}

// GET /api/order-product — گروه‌بندی‌شده به ازای هر سفارش (doc)
export interface OrderGroupedDTO {
    customerOrderId: string;
    customerOrder: CustomerOrderDTO;
    products: OrderProductSummaryDTO[];
}

// خلاصه‌ی محصول داخل گروه (doc)
export interface OrderProductSummaryDTO {
    id: string;
    title: string;
    mainImage: string;
    price: number;
    slug: string;
    quantity: number;
}