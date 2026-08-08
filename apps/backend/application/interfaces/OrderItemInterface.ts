import {OrderItemDTO} from "#application/dto/OrderItemDTO.ts";
import {createOrderItemCommand, updateOrderItemCommand} from "#application/types/orderItem/command.ts";


export interface OrderItemServiceInterface {
    createOrderProduct(command: createOrderItemCommand): Promise<OrderItemDTO>
    updateProductOrder(command: updateOrderItemCommand): Promise<OrderItemDTO>
    deleteProductOrder(id: string): Promise<void>
    getProductOrder(id: string): Promise<OrderItemDTO[]>
    getAllProductOrders(): Promise<any>
}