import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {productDTOSchema} from "#webhost/validators/products/products.ts";

extendZodWithOpenApi(z);

const getMerchantByIdSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const createMerchantSchema = z.object({
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." }),
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
    phone: z.string({ error: "phone is required." }).min(1, { error: "phone is required." }),
    address: z.string({ error: "address is required." }).min(1, { error: "address is required." }),
    description: z.string({ error: "description is required." }).min(1, { error: "description is required." }),
    status: z.string({ error: "status is required." }).min(1, { error: "status is required." }),
});

const updateMerchantSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." }),
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
    phone: z.string({ error: "phone is required." }).min(1, { error: "phone is required." }),
    address: z.string({ error: "address is required." }).min(1, { error: "address is required." }),
    description: z.string({ error: "description is required." }).min(1, { error: "description is required." }),
    status: z.string({ error: "status is required." }).min(1, { error: "status is required." }),
});

const deleteMerchantSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." })
});

const merchantDTOSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    status: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    products: z.array(z.lazy((): z.ZodType => productDTOSchema))
        .optional()
        .nullable(),
}).openapi('merchantDTOSchema');

export {
    getMerchantByIdSchema,
    createMerchantSchema,
    updateMerchantSchema,
    deleteMerchantSchema,
    merchantDTOSchema,
}
