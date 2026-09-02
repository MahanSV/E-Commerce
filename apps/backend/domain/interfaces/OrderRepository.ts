import { updateCustomerOrderCommand } from "#application/types/order/command.ts";
import Order from "#models/Order.ts";


export interface OrderRepositoryInterface {
    getOrderById(id: string): Promise<Order | null>

    checkOrderExist(id: string): Promise<Order | null>

    createCustomerOrder(entity: Order): Promise<Order>

    updateCustomerOrder(command: updateCustomerOrderCommand): Promise<Order>

    deleteCustomerOrder(id: string): Promise<Order>

    getAllOrders(page: number, limit: number, offset: number): Promise<{
        orders: Order[],
        pagination: {
            page: number,
            limit: number
            total: number,
            totalPages: number
        }
    }>

    findRecentDuplicateOrder(email: string, total: number): Promise<Order | null>
}