import crypto from "crypto";
import {UserType} from "#domain/enums/userType.js";
import User from "#models/User.ts";

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
  }
}
