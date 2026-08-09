import type { Request, Response } from 'express';
import ApiError from "#webhost/errors/apiError.ts";
import BulkUploadService from "#application/services/BulkUpload.ts";


class BulkUploadController {
    private bulkUploadService: BulkUploadService;

    constructor(bulkUploadService = new BulkUploadService()) {
        this.bulkUploadService = bulkUploadService;
    };

    public async uploadCsvAndCreateBatch(req: Request, res: Response): Promise<any> {
        try {
            const csvFile = req?.files?.file;

            const bulkUpload = await this.bulkUploadService.uploadCsvAndCreateBatch(csvFile);

            res.json(bulkUpload);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async listBatches(req: Request, res: Response): Promise<any> {
        try {
            const bulkUpload = await this.bulkUploadService.listBatches();

            res.json(bulkUpload);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async getBatchDetail(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;*/
        try {
            const batchId = req.params.batchId;

            const bulkUpload = await this.bulkUploadService.getBatchDetail(batchId);

            res.json(bulkUpload);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async updateBatchItems(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;
        const { items } = req.body;*/
        try {
            const command = {
                batchId: req.params.batchId,
                items: req.body.items,
            };

            const bulkUpload = await this.bulkUploadService.updateBatchItems(command.batchId, command.items);

            res.json(bulkUpload);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async deleteBatch(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;
        const deleteProducts = req.query.deleteProducts === "true";*/
        try {
            const command = {
                batchId: req.params.batchId,
                deleteProducts: req.query.deleteProducts === "true",
            };

            const bulkUpload = await this.bulkUploadService.deleteBatch(command.batchId, command.deleteProducts);

            res.json(bulkUpload);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new BulkUploadController();