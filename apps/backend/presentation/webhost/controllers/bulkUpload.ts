import httpStatus from 'http-status';
import type { Request, Response } from 'express';
import ApiError from "#webhost/errors/apiError.js";


class BulkUploadController {
    constructor() {};

    public async uploadCsvAndCreateBatch(req: Request, res: Response): Promise<any> {
        try {
            const csvFile = req?.files?.file;
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async listBatches(req: Request, res: Response): Promise<any> {};

    public async getBatchDetail(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;*/
        try {
            const batchId = req.params.batchId;
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
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new BulkUploadController();