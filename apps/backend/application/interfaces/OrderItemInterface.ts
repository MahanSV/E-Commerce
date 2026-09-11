import {CreateOrderProductDTO, OrderGroupedDTO, OrderProductDTO} from "#application/dto/OrderItemDTO.ts";
import {createOrderItemCommand, updateOrderItemCommand} from "#application/types/orderItem/command.ts";


export interface OrderItemServiceInterface {
    createOrderProduct(command: createOrderItemCommand): Promise<CreateOrderProductDTO>
    updateProductOrder(command: updateOrderItemCommand): Promise<OrderProductDTO>
    deleteProductOrder(id: string): Promise<void>
    getProductOrder(id: string): Promise<OrderProductDTO[]>
    getAllProductOrders(): Promise<OrderGroupedDTO[]>
}