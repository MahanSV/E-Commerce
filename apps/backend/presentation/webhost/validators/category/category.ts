import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {productDTOSchema} from "#webhost/validators/products/products.ts";

extendZodWithOpenApi(z);

const createCategorySchema = z.object({
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." })
});

const getCategorySchema = z.object({
    id: z.string().optional()
});

const updateCategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().optional()
});

const deleteCategorySchema = z.object({
    id: z.string().optional(),
});

const categoryDTOSchema = z.object({
    id: z.string(),
    name: z.string(),
    products: z.array(z.lazy((): z.ZodType => productDTOSchema)).nullable().optional(),
});

export {
    createCategorySchema,
    getCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    categoryDTOSchema
};
