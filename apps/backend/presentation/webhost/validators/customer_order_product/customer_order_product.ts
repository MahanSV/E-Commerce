import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {customerOrderDTOSchema} from "#webhost/validators/customer_orders/customer_orders.ts";
import {productDTOSchema} from "#webhost/validators/products/products.ts";

extendZodWithOpenApi(z);


const createOrderProduct= z.object({
    customerOrderId: z.string({ error: "customerOrderId is required." }).min(1, { error: "customerOrderId is required." }),
    productId: z.string({ error: "productId is required." }).min(1, { error: "productId is required." }),
    quantity: z.coerce.number().positive(),
});

const updateProductOrder= z.object({
    id: z.string().optional(),
    customerOrderId: z.string().optional(),
    productId: z.string().optional(),
    quantity: z.string().optional(),
});

const deleteProductOrder= z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." })
});

const getProductOrder= z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." })
});

const orderItemDTOSchema = z.object({
    id: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
    customerOrder: customerOrderDTOSchema,
    products: productDTOSchema,
});

const createOrderProductDTOSchema = z.object({
    id: z.string(),
    customerOrderId: z.string(),
    productId: z.string(),
    quantity: z.number().positive(),
});

const orderProductDTOSchema = z.object({
    id: z.string(),
    customerOrderId: z.string(),
    productId: z.string(),
    products: productDTOSchema
});

const orderProductSummaryDTOSchema = z.object({
    id: z.string(),
    title: z.string(),
    mainImage: z.string(),
    price: z.number().positive(),
    slug: z.string(),
    quantity: z.number().positive(),
});

const orderGroupedDTOSchema = z.object({
    customerOrderId: z.string(),
    customerOrder: customerOrderDTOSchema,
    products: z.array(orderProductSummaryDTOSchema)
});


export {
    createOrderProduct,
    updateProductOrder,
    deleteProductOrder,
    getProductOrder,
    orderItemDTOSchema,
    createOrderProductDTOSchema,
    orderProductDTOSchema,
    orderGroupedDTOSchema,
    orderProductSummaryDTOSchema,
}
