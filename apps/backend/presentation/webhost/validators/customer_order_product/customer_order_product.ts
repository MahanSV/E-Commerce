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
    customerOrderId: z.string({ error: "customerOrderId is required." }).min(1, { error: "customerOrderId is required." }),
    productId: z.string({ error: "productId is required." }).min(1, { error: "productId is required." }),
    quantity: z.coerce.number({ error: "quantity is required." }).positive({ error: "quantity must be greater than 0." }),
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
    customerOrder: z.lazy((): z.ZodType => customerOrderDTOSchema),
    products: z.lazy((): z.ZodType => productDTOSchema),
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
    quantity: z.number().positive(),
    product: z.lazy((): z.ZodType => productDTOSchema)
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
    customerOrder: z.lazy((): z.ZodType => customerOrderDTOSchema),
    products: z.array(z.lazy((): z.ZodType => orderProductSummaryDTOSchema))
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
