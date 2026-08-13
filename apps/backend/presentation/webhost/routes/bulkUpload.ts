import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import BulkUploadController from '#webhost/controllers/bulkUpload.ts';
import validate from "#middlewares/validation.ts";
import {
    deleteBatchSchema,
    getBatchDetailSchema,
    updateBatchItemsSchema,
    uploadCsvAndCreateBatchSchema
} from "#webhost/validators/bulkUpload/bulkUpload.ts";

const router = express.Router();

router.post(
    '/',
    authenticate,
    validate(uploadCsvAndCreateBatchSchema),
    BulkUploadController.uploadCsvAndCreateBatch
);

router.get('/', authenticate, BulkUploadController.listBatches);

router.get(
    '/:batchId',
    authenticate,
    validate(getBatchDetailSchema),
    BulkUploadController.getBatchDetail
);

router.put(
    '/:batchId',
    authenticate,
    validate(updateBatchItemsSchema),
    BulkUploadController.updateBatchItems
);

router.delete(
    '/:batchId',
    authenticate,
    validate(deleteBatchSchema),
    BulkUploadController.deleteBatch
);

export default router;