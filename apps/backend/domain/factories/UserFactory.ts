import crypto from "crypto";
import {UserType} from "#domain/enums/userType.ts";
import User from "#models/User.ts";
import {createCustomerCommand} from "#application/types/user/command.ts";
import env from "#substructure/env.ts";

export class UserFactory {
  /**
   * Creates a new User entity
   */
  public static async create(email: string, password: string, role: UserType): Promise<User> {
      // Add any domain logic or validation here before creating the entity

      return await User.create({
          id: crypto.randomUUID(), // Generate ID if isn't provided
          name: "Unknown",
          lastName: "Unknown",
          email: email,
          password: password,
          role: role || UserType.user,
          mobile: "Unknown",
          status: "Unknown",
          createdAt: new Date(),
          updatedAt: new Date(),
      });
  };

  public static async createCustomer(command: createCustomerCommand): Promise<User> {
      return await User.create({
          id: crypto.randomUUID(), // Generate ID if isn't provided
          name: command.name,
          lastName: command.lastName,
          email: command.email,
          password: env.defaultPassword,
          role: UserType.user,
          mobile: command.mobile,
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
      });
  };
}
