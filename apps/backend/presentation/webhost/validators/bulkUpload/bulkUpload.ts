import { z } from 'zod';


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

export {
    uploadCsvAndCreateBatchSchema,
    getBatchDetailSchema,
    updateBatchItemsSchema,
    deleteBatchSchema,
}
