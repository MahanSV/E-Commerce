import OrderItem from "#domain/models/OrderItem.ts";
import crypto from "crypto";
import {createOrderItemCommand} from "#application/types/orderItem/command.ts";



export class OrderItemFactory {
    /**
     * Creates a new OrderItem entity
     */
    public static create(command: createOrderItemCommand): OrderItem {
        // Add any domain logic or validation here before creating the entity

        return OrderItem.create({
            id : crypto.randomUUID(), // Generate ID if isn't provided
            orderId: command.orderId,
            productId: command.productId,
            quantity: command.quantity,
            price: command.price,
        });
    };
}