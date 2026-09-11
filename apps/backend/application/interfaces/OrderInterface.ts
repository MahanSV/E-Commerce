import {createCustomerOrderCommand, updateCustomerOrderCommand} from "#application/types/order/command.ts";
import {CustomerOrderDTO} from "#application/dto/CustomerOrderDTO.ts";


export interface OrderServiceInterface {
    createCustomerOrder(command: createCustomerOrderCommand): Promise<CustomerOrderDTO>
    updateCustomerOrder(command: updateCustomerOrderCommand): Promise<CustomerOrderDTO>
    deleteCustomerOrder(id: string): Promise<CustomerOrderDTO>
    getCustomerOrder(id: string): Promise<CustomerOrderDTO>
    getAllOrders(page: number, limit: number): Promise<{
        orders: CustomerOrderDTO[],
        pagination: {
            page: number,
            limit: number
            total: number,
            totalPages: number
        }
    }>
}