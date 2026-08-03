import MerchantService from "#application/services/Merchant.ts";
import type { Request, Response } from 'express';
import ApiError from "#webhost/errors/apiError.ts";


class MerchantController {
    private merchantService: MerchantService;
    constructor(merchantService = new MerchantService()) {
        this.merchantService = merchantService;
    };

    public async getAllMerchants(req: Request, res: Response): Promise<any> {
        try {
            const merchants = await this.merchantService.getAllMerchants();

            res.json(merchants);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async getMerchantById(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const merchant = await this.merchantService.getMerchantById(id);

            res.json(merchant);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async createMerchant(req: Request, res: Response): Promise<any> {
        /*const { name, email, phone, address, description, status } = req.body;*/
        try {
            const command = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                description: req.body.description,
                status: req.body.status,
            };

            const merchant = await this.merchantService.createMerchant(command);

            res.status(201).json(merchant);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async updateMerchant(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { name, email, phone, address, description, status } = req.body;*/
        try {
            const command = {
                id: req.params.id,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                description: req.body.description,
                status: req.body.status,
            };

            const merchant = await this.merchantService.updateMerchant(command);

            res.json(merchant);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async deleteMerchant(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            await this.merchantService.deleteMerchant(id);

            res.status(204).send();
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new MerchantController();