import httpStatus from 'http-status';
import type { Request, Response } from 'express';


class BulkUploadController {
    constructor() {};

    public async uploadCsvAndCreateBatch(req: Request, res: Response): Promise<any> {
        const csvFile = req?.files?.file;
    };

    public async listBatches(req: Request, res: Response): Promise<any> {};

    public async getBatchDetail(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;*/
        const batchId = req.params.batchId;
    };

    public async updateBatchItems(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;
        const { items } = req.body;*/
        const command = {
            batchId: req.params.batchId,
            items: req.body.items,
        };
    };

    public async deleteBatch(req: Request, res: Response): Promise<any> {
        /*const { batchId } = req.params;
        const deleteProducts = req.query.deleteProducts === "true";*/

        const command = {
            batchId: req.params.batchId,
            deleteProducts: req.query.deleteProducts === "true",
        };
    };
}

export default new BulkUploadController();