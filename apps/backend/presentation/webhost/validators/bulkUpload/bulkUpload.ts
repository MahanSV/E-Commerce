import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {bulkUploadItemDTOSchema} from "#webhost/validators/bulkUpload/bulkUploadItem.ts";
import {userDTOSchema} from "#webhost/validators/user/user.ts";


const uploadCsvAndCreateBatchSchema = z.object({
    files: z.unknown().refine((value) => value !== undefined && value !== null, { message: "files is required." }),
});

const getBatchDetailSchema = z.object({
    batchId: z.string({ error: "batchId is required." }).min(1, { error: "batchId is required." }),
});

const updateBatchItemsSchema = z.object({
    batchId: z.string({ error: "batchId is required." }).min(1, { error: "batchId is required." }),
    items: z
        .array(z.string().min(1))
        .min(1, { error: "items must contain at least one item." }),
});

const deleteBatchSchema = z.object({
    batchId: z.string({ error: "batchId is required." }).min(1, { error: "batchId is required." }),
    deleteProducts: z.string({ error: "deleteProducts is required." }).min(1, { error: "deleteProducts is required." }),
});

extendZodWithOpenApi(z);

const bulkUploadBatchStatus = z.enum(['PENDING', 'COMPLETED', 'PARTIAL', 'FAILED',])

const bulkUploadBatchDTOSchema = z.object({
    id: z.string(),
    fileName: z.string(),
    createdAt: z.date(),
    status: bulkUploadBatchStatus,
    itemCount: z.number(),
    errorCount: z.number(),
    userId: z.string().optional(),

    items: z.array(z.lazy((): z.ZodType => bulkUploadItemDTOSchema))
        .nullable()
        .optional(),

    user: z.lazy((): z.ZodType => userDTOSchema)
        .nullable()
        .optional(),
});


const bulkUploadBatchReportDTOSchema = z.object({
    batches: z.array(
        z.object({
            id: z.string(),
            fileName: z.string(),
            totalRecords: z.number(),
            successfulRecords: z.number(),
            failedRecords: z.number(),
            status: bulkUploadBatchStatus,
            uploadedBy: z.string(),
            uploadedAt: z.date(),
            errors: z.unknown()
        })
    )
});

const bulkUploadBatchDetailDTO = z.object({
    batch: z.lazy((): z.ZodType => bulkUploadBatchDTOSchema),
    items: z.array(z.lazy((): z.ZodType => bulkUploadItemDTOSchema))
        .nullable()
        .optional(),
});

const updateBatchItemsResponseSchema = z.object({
    updatedCount: z.number(),
    items: z.array(
        z.object({
            error: z.string().optional().nullable(),
            id: z.string(),
            status: z.string(),
            batchId: z.string(),
            productId: z.string().optional().nullable(),
            title: z.string(),
            slug: z.string(),
            price: z.number(),
            manufacturer: z.string().optional().nullable(),
            description: z.string().optional().nullable(),
            mainImage: z.string().optional().nullable(),
            categoryId: z.string(),
            inStock: z.number(),
        })
    )
});

export {
    uploadCsvAndCreateBatchSchema,
    getBatchDetailSchema,
    updateBatchItemsSchema,
    deleteBatchSchema,
    bulkUploadBatchDTOSchema,
    bulkUploadBatchReportDTOSchema,
    bulkUploadBatchDetailDTO,
    updateBatchItemsResponseSchema,
}
