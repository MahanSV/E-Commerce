import httpStatus from 'http-status';
import type { Request, Response } from 'express';

class CustomerOrderProductController {
    constructor() {};

    public async createOrderProduct(req: Request, res: Response): Promise<any> {
        /*const { customerOrderId, productId, quantity } = req.body;*/
        const command = {
            customerOrderId: req.body.customerOrderId,
            productId: req.body.productId,
            quantity: req.body.quantity,
        };
    };

    public async updateProductOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { customerOrderId, productId, quantity } = req.body;*/
        const command = {
            id: req.params.id,
            customerOrderId: req.body.customerOrderId,
            productId: req.body.productId,
            quantity: req.body.quantity,
        };
    };

    public async deleteProductOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };

    public async getProductOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };

    public async getAllProductOrders(req: Request, res: Response): Promise<any> {};
}

export default new CustomerOrderProductController();