import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import BulkUploadController from '#webhost/controllers/bulkUpload.ts';
import validate from "#middlewares/validation.ts";
import {
    bulkUploadBatchDetailDTO,
    bulkUploadBatchReportDTOSchema,
    deleteBatchSchema,
    getBatchDetailSchema, updateBatchItemsResponseSchema,
    updateBatchItemsSchema,
} from "#webhost/validators/bulkUpload/bulkUpload.ts";
import multer from 'multer';
import { z } from 'zod';
import {createApiRouter} from "#webhost/docs/openApiRouter.ts";

const router = express.Router();
const api = createApiRouter(router, '/bulk-upload');

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    '/',
    // authenticate,
    upload.single("file"),
    BulkUploadController.uploadCsvAndCreateBatch
);

api.get(
    '/',
    {
        tags: ['bulk-upload'],
        responses: {
            200: {
                description: 'List of Batches',
                content: { 'application/json': { schema:  bulkUploadBatchReportDTOSchema} }
            }
        }
    },
    /*authenticate,*/
    BulkUploadController.listBatches
);

api.get(
    '/:batchId',
    {
        tags: ['bulk-upload'],
        request: {
            params: z.object({ batchId: z.string() }),
        },
        responses: {
            200: {
                description: 'getBatchDetail',
                content: { 'application/json': { schema: bulkUploadBatchDetailDTO } }
            },
            404: { description: "Batch not found" }
        }
    },
    // authenticate,
    validate(getBatchDetailSchema),
    BulkUploadController.getBatchDetail
);

api.put(
    '/:batchId',
    {
        tags: ['bulk-upload'],
        request: {
            params: z.object({ batchId: z.string() }),
            body: {
                content: {
                    'application/json': {
                        schema: updateBatchItemsSchema.omit({ batchId: true })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'updateBatchItems',
                content: { 'application/json': { schema: updateBatchItemsResponseSchema } }
            },
            404: { description: "Batch not found" }
        }
    },
    // authenticate,
    validate(updateBatchItemsSchema),
    BulkUploadController.updateBatchItems
);

api.delete(
    '/:batchId',
    {
        tags: ['bulk-upload'],
        request: {
            params: z.object({ batchId: z.string() }),
            query: z.object({ deleteProducts: z.string() }),
        },
        responses: {
            200: {
                description: 'deleteBatch',
                content: { 'application/json': { schema: z.object({
                            success: z.boolean(),
                            message: z.string(),
                            deletedProducts: z.boolean(),
                        }) }
                }
            },
            404: { description: "Batch not found" },
            409: { description: "Cannot delete products" },
        }
    },
    // authenticate,
    validate(deleteBatchSchema),
    BulkUploadController.deleteBatch
);

export default router;