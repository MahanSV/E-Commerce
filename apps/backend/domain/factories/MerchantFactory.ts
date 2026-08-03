import Merchant from "#models/Merchant.ts";
import {createMerchantCommand} from "#application/types/merchant/command.ts";


export class MerchantFactory {
  /**
   * Creates a new Merchant entity
   */
  public static create(command: createMerchantCommand): Merchant {
    // Add any domain logic or validation here before creating the entity

    return Merchant.create({
        id : crypto.randomUUID(), // Generate ID if isn't provided
        name: command.name,
        description: command.description,
        email: command.email,
        address: command.address,
        status: command.status || "Active",
        password: command.password, // TODO: Create default password from env
        createdAt: new Date(),
        updatedAt: new Date(),
    });
  };
}