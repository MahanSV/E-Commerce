import Order from "#domain/models/Order.ts";
import {createCustomerOrderCommand} from "#application/types/order/command.ts";
import crypto from "crypto";
import { addMonths } from 'date-fns';



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
            total: 0,
            // Next Month calculated for deliversAt
            // TODO: Use date package instead.
            deliversAt: addMonths(new Date(), 1),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };
}