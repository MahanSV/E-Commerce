import Order from "#domain/models/Order.ts";
import {createCustomerOrderCommand} from "#application/types/order/command.ts";
import crypto from "crypto";



export class OrderFactory {
    /**
     * Creates a new Order entity
     */
    public static create(command: createCustomerOrderCommand): Order {
        // Add any domain logic or validation here before creating the entity

        return Order.create({
            id : crypto.randomUUID(), // Generate ID if isn't provided
            userId: command.userId,
            status: command.status,
            isActive: true,
            companyName: command.company,
            address: command.address,
            apartment: command.apartment,
            postalCode: command.postalCode,
            country: command.country,
            city: command.city,
            description: command.description,
            quantity: 0,
            // Next Month calculated for deliversAt
            deliversAt: (d => (x => (d.setMonth(d.getMonth() + 1), d.getDate() !== x && d.setDate(0), d))(d.getDate()))(new Date()),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };
}