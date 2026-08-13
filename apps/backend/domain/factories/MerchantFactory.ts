import Merchant from "#models/Merchant.ts";
import {createMerchantCommand} from "#application/types/merchant/command.ts";
import env from "#substructure/env.ts";


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
        mobile: command.phone,
        address: command.address,
        status: command.status || "Active",
        password: command.password || env.defaultPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
  };
}