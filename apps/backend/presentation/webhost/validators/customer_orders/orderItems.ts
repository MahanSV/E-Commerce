import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {productDTOSchema} from "#webhost/validators/products/products.ts";
import {customerOrderDTOSchema} from "#webhost/validators/customer_orders/customer_orders.ts";

extendZodWithOpenApi(z);


const orderItemDTOSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    price: z.number(),
    customerOrder: z.lazy((): z.ZodType => customerOrderDTOSchema),
    products: z.lazy((): z.ZodType => productDTOSchema),
});

const createOrderProductDTO = z.object({
    id: z.string(),
    customerOrderId: z.string(),
    productId: z.string(),
    quantity: z.number(),
});

const orderProductDTO = z.object({
    id: z.string(),
    customerOrderId: z.string(),
    productId: z.string(),
    quantity: z.number(),
    product: z.lazy((): z.ZodType => productDTOSchema),
});

const orderGroupedDTO = z.object({
    customerOrderId: z.string(),
    customerOrder: z.lazy((): z.ZodType => customerOrderDTOSchema),
    products: z.array(z.lazy((): z.ZodType => productDTOSchema)),
});

const orderProductSummaryDTO = z.object({
    id: z.string(),
    title: z.string(),
    mainImage: z.string(),
    price: z.number(),
    slug: z.string(),
    quantity: z.number(),
});

export {
    orderItemDTOSchema,
    createOrderProductDTO,
    orderProductDTO,
    orderGroupedDTO,
    orderProductSummaryDTO,
};
