import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {productDTOSchema} from "#webhost/validators/products/products.ts";

extendZodWithOpenApi(z);

const createCategorySchema = z.object({
    name: z.string().optional()
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
    products: z.array(productDTOSchema)
        .nullable()
        .optional()
        .openapi({
            type: 'array',
            nullable: true,
        }),
});

export {
    createCategorySchema,
    getCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    categoryDTOSchema
};
