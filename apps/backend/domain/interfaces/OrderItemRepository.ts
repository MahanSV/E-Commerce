import OrderItem from "#domain/models/OrderItem.ts"
import {updateOrderItemCommand} from "#application/types/orderItem/command.ts";


export interface OrderItemRepositoryInterface {
    getOrderProductById(id: string): Promise<OrderItem | null>
    createOrderProduct(entity: OrderItem): Promise<OrderItem>
    updateProductOrder(command: updateOrderItemCommand): Promise<OrderItem>
    deleteProductOrder(id: string): Promise<void>
    getProductOrder(id: string): Promise<OrderItem[]>
    getAllProductOrders(): Promise<OrderItem[]>
    findAllByProductIds(productIds: string[]): Promise<OrderItem[]>
}