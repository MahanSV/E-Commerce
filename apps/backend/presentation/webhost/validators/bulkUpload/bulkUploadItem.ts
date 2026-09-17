import { z } from 'zod';
import {bulkUploadBatchDTOSchema} from "#webhost/validators/bulkUpload/bulkUpload.ts";
import {productDTOSchema} from "#webhost/validators/products/products.ts";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const bulkUploadItemStatus = z.enum((['CREATED', 'UPDATED', 'ERROR']));

const bulkUploadItemDTOSchema = z.object({
    id: z.string(),
    batchId: z.string().optional(),
    productId: z.string().optional(),
    title: z.string(),
    slug: z.string(),
    price: z.number(),
    manufacturer: z.string().optional(),
    description: z.string().optional(),
    mainImage: z.string().optional(),
    categoryId: z.string(),
    inStock: z.number(),
    status: bulkUploadItemStatus,
    error: z.string().optional(),

    batch: z.lazy((): z.ZodType => bulkUploadBatchDTOSchema)
        .nullable()
        .optional()
        .openapi({
            type: 'object',
            nullable: true,
        }),

    product: z.lazy((): z.ZodType => productDTOSchema)
        .nullable()
        .optional()
        .openapi({
            type: 'object',
            nullable: true,
        }),
});

export { bulkUploadItemDTOSchema };