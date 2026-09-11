import Order from "#domain/models/Order.ts";
import {createCustomerOrderCommand} from "#application/types/order/command.ts";
import crypto from "crypto";
import { addDays } from 'date-fns'
import env from "#substructure/env.ts";



export class OrderFactory {
    /**
     * Creates a new Order entity
     */
    public static create(command: createCustomerOrderCommand): Order {
        // Add any domain logic or validation here before creating the entity

        return Order.create({
            id : crypto.randomUUID(), // Generate ID if isn't provided
            userId: command.userId || "",
            status: command.status || "pending",
            isActive: true,
            companyName: command.company,
            address: command.address,
            apartment: command.apartment,
            postalCode: command.postalCode,
            country: command.country,
            city: command.city,
            description: command.description,
            total: Number(command.total) || 0,
            deliversAt: addDays(new Date(), Number(env.productDeliveryDays)),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };
}