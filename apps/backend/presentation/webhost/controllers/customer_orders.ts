import type { Request, Response } from 'express';
import {OrderService} from "#application/services/Order.ts";

class CustomerOrdersController {
    private orderService: OrderService;
    constructor(orderService = new OrderService()) {
        this.orderService = orderService;
    };

    public async createCustomerOrder(req: Request, res: Response): Promise<any> {
        try {
            const command = {
                name: req.body.name,
                lastname: req.body.lastname,
                mobile: req.body.phone, // Note: Changed "phone" to "mobile"
                email: req.body.email,
                company: req.body.company,
                address: req.body.adress, // Note: Changed "address" to "adress"
                apartment: req.body.apartment,
                postalCode: req.body.postalCode,
                status: req.body.status,
                total: req.body.total,
                city: req.body.city,
                country: req.body.country,
                description: req.body.orderNotice, // Note: Changed "orderNotice" to "description"
                userId: (req as any).tokenData?.id || req.body.userId,
            };

            const order = await this.orderService.createCustomerOrder(command);

            const responseData = {
                id: order.id,
                message: "Order created successfully",
                orderNumber: order.id
            };
            return res.status(201).json(responseData);
        } catch (error) {
            throw error;
        }
    };

    public async updateCustomerOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const command = {
                id: req.params.id,
                address: req.body.adress, // Note: Changed "address" to "adress"
                apartment: req.body.apartment,
                company: req.body.company,
                createdAt: req.body.dateTime, // Note: Changed "dateTime" to "createdAt"
                email: req.body.email,
                lastname: req.body.lastname,
                name: req.body.name,
                mobile: req.body.phone, // Note: Changed "phone" to "mobile"
                postalCode: req.body.postalCode,
                status: req.body.status,
                city: req.body.city,
                country: req.body.country,
                description: req.body.orderNotice, // Note: Changed "orderNotice" to "description"
                total: Number(req.body.total),
            };

            const updatedOrder = await this.orderService.updateCustomerOrder(command);

            return res.status(200).json(updatedOrder);
        } catch (error) {
            throw error;
        }
    };

    public async deleteCustomerOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            await this.orderService.deleteCustomerOrder(id);

            return res.status(204).send();
        } catch (error) {
            throw error;
        }
    };

    public async getCustomerOrder(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const order = await this.orderService.getCustomerOrder(id);

            return res.status(200).json(order);
        } catch (error) {
            throw error;
        }
    };

    public async getAllOrders(req: Request, res: Response): Promise<any> {
        // Add pagination and filtering for better performance
        try {
            const page = parseInt(<string>req.query.page) || 1;
            const limit = parseInt(<string>req.query.limit) || 50;

            // Validate pagination parameters
            if (page < 1 || limit < 1 || limit > 100) {
                return res.status(400).json({
                    error: "Invalid pagination parameters",
                    details: "Page must be >= 1, limit must be between 1 and 100"
                });
            }

            const orders = await this.orderService.getAllOrders(page, limit);

            return res.json(orders);
        } catch (error) {
            throw error;
        }
    };
}

export default new CustomerOrdersController();