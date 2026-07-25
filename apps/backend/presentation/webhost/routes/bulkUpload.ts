import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import BulkUploadController from '#webhost/controllers/bulkUpload.ts';

const router = express.Router();

router.post('/', authenticate, BulkUploadController.uploadCsvAndCreateBatch);

router.get('/', authenticate, BulkUploadController.listBatches);

router.get('/:batchId', authenticate, BulkUploadController.getBatchDetail);

router.put('/:batchId', authenticate, BulkUploadController.updateBatchItems);

router.delete('/:batchId', authenticate, BulkUploadController.deleteBatch);

export default router;