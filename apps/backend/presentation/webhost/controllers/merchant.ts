import type { Request, Response } from 'express';
import httpStatus from 'http-status';


class MerchantController {
    constructor() {};

    public async getAllMerchants(req: Request, res: Response): Promise<any> {};

    public async getMerchantById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };

    public async createMerchant(req: Request, res: Response): Promise<any> {
        const { name, email, phone, address, description, status } = req.body;
    };

    public async updateMerchant(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { name, email, phone, address, description, status } = req.body;
    };

    public async deleteMerchant(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };
}

const merchantController = new MerchantController();

export const getAllMerchants = merchantController.getAllMerchants.bind(merchantController);
export const getMerchantById = merchantController.getMerchantById.bind(merchantController);
export const createMerchant = merchantController.createMerchant.bind(merchantController);
export const updateMerchant = merchantController.updateMerchant.bind(merchantController);
export const deleteMerchant = merchantController.deleteMerchant.bind(merchantController);