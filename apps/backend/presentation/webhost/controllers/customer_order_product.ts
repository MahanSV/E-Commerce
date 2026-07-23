import httpStatus from 'http-status';
import type { Request, Response } from 'express';

class CustomerOrderProductController {
    constructor() {};

    public async createOrderProduct(req: Request, res: Response): Promise<any> {
        const { customerOrderId, productId, quantity } = req.body;
    };

    public async updateProductOrder(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { customerOrderId, productId, quantity } = req.body;
    };

    public async deleteProductOrder(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };

    public async getProductOrder(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };

    public async getAllProductOrders(req: Request, res: Response): Promise<any> {};
}

export default new CustomerOrderProductController();