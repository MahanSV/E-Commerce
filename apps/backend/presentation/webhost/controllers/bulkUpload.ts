import type { Request, Response } from 'express';
import ApiError from "#webhost/errors/apiError.ts";
import BulkUploadBatchService from "#application/services/BulkUpload.ts";
import httpStatus from "http-status";


class BulkUploadController {
    private bulkUploadBatchService: BulkUploadBatchService;

    constructor(bulkUploadBatchService = new BulkUploadBatchService()) {
        this.bulkUploadBatchService = bulkUploadBatchService;
    };

    public uploadCsvAndCreateBatch = async (req: Request, res: Response): Promise<any> => {
        try {
            const csvFile = req.file;

            if (!csvFile) {
                throw new ApiError(httpStatus.BAD_REQUEST, "CSV file is required", "Error");
            }

            const bulkUpload = await this.bulkUploadBatchService.uploadCsvAndCreateBatch(csvFile);

            res.status(201).json(bulkUpload);
        } catch (error) {
            throw error;
        }
    };

    public listBatches = async (req: Request, res: Response): Promise<any> => {
        try {
            const bulkUpload = await this.bulkUploadBatchService.listBatches();

            res.json(bulkUpload);
        } catch (error) {
            throw error;
        }
    };

    public getBatchDetail = async (req: Request, res: Response): Promise<any> => {
        /*const { batchId } = req.params;*/
        try {
            const batchId = req.params.batchId;

            const bulkUpload = await this.bulkUploadBatchService.getBatchDetail(batchId);

            res.json(bulkUpload);
        } catch (error) {
            throw error;
        }
    };

    public updateBatchItems = async (req: Request, res: Response): Promise<any> => {
        /*const { batchId } = req.params;
        const { items } = req.body;*/
        try {
            const command = {
                batchId: req.params.batchId,
                items: req.body.items,
            };

            const bulkUpload = await this.bulkUploadBatchService.updateBatchItems(command);

            res.json(bulkUpload);
        } catch (error) {
            throw error;
        }
    };

    public deleteBatch = async (req: Request, res: Response): Promise<any> => {
        /*const { batchId } = req.params;
        const deleteProducts = req.query.deleteProducts === "true";*/
        try {
            const command = {
                batchId: req.params.batchId,
                deleteProducts: req.query.deleteProducts === "true",
            };

            const bulkUpload = await this.bulkUploadBatchService.deleteBatch(command.batchId, command.deleteProducts);

            res.json(bulkUpload);
        } catch (error) {
            throw error;
        }
    };
}

export default new BulkUploadController();