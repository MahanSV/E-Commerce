import crypto from "crypto";
import {UserType} from "#domain/enums/userType.ts";
import User from "#models/User.ts";
import {createCustomerCommand} from "#application/types/user/command.ts";

export class UserFactory {
  /**
   * Creates a new User entity
   */
  public static create(email: string, password: string, role: UserType): User {
    // Add any domain logic or validation here before creating the entity

    return User.create({
        id : crypto.randomUUID(), // Generate ID if isn't provided
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

  public static createCustomer(command: createCustomerCommand): User {
      return User.create({
          id : crypto.randomUUID(), // Generate ID if isn't provided
          name: command.name,
          lastName: command.lastName,
          email: command.email,
          password: "123456", // TODo: read from ENV for default password!
          role: UserType.user,
          mobile: command.mobile,
          status: "Active",
          createdAt: new Date(),
          updatedAt: new Date(),
      });
  };
}
