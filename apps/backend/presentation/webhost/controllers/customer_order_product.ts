import type { Request, Response } from 'express';
import ApiError from "#webhost/errors/apiError.ts";
import {OrderItemService} from "#application/services/OrderItem.ts";

class CustomerOrderProductController {
    private orderItemService: OrderItemService;
    constructor(orderItemService = new OrderItemService()) {
        this.orderItemService = orderItemService;
    };

    public async createOrderProduct(req: Request, res: Response): Promise<any> {
        /*const { customerOrderId, productId, quantity } = req.body;*/
        try {
            const command = {
                orderId: req.body.customerOrderId, // Note: Changed "customerOrderId" to "orderId"
                productId: req.body.productId,
                quantity: req.body.quantity,
            };

            const orderProduct = await this.orderItemService.createOrderProduct(command);

            res.status(201).json(orderProduct);
        } catch (error) {
            throw error;
        }
    };

    public async updateProductOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { customerOrderId, productId, quantity } = req.body;*/
        try {
            const command = {
                id: req.params.id,
                orderId: req.body.customerOrderId, // Note: Changed "customerOrderId" to "orderId"
                productId: req.body.productId,
                quantity: req.body.quantity,
            };

            const updatedOrder = await this.orderItemService.updateProductOrder(command);

            res.json(updatedOrder);
        } catch (error) {
            throw error;
        }
    };

    public async deleteProductOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            await this.orderItemService.deleteProductOrder(id);

            res.status(204).send();
        } catch (error) {
            throw error;
        }
    };

    public async getProductOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const order = await this.orderItemService.getProductOrder(id);

            res.status(200).json(order);
        } catch (error) {
            throw error;
        }
    };

    public async getAllProductOrders(req: Request, res: Response): Promise<any> {
        try {
            const groupedOrders = await this.orderItemService.getAllProductOrders();
            res.json(groupedOrders);
        } catch (error) {
            throw error;
        }
    };
}

export default new CustomerOrderProductController();