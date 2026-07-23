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

const customerOrderProductController = new CustomerOrderProductController();

export const createOrderProduct = customerOrderProductController.createOrderProduct.bind(customerOrderProductController);
export const updateProductOrder = customerOrderProductController.updateProductOrder.bind(customerOrderProductController);
export const deleteProductOrder = customerOrderProductController.deleteProductOrder.bind(customerOrderProductController);
export const getProductOrder = customerOrderProductController.getProductOrder.bind(customerOrderProductController);
export const getAllProductOrders = customerOrderProductController.getAllProductOrders.bind(customerOrderProductController);