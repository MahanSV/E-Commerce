import crypto from "crypto";
import {createNotificationCommand} from "#application/types/notification/command.ts";
import Notification from "#models/Notification.ts";

export class NotificationFactory {
  /**
   * Creates a new Notification entity
   */
  public static create(command: createNotificationCommand): Notification {
    // Add any domain logic or validation here before creating the entity

    return Notification.create({
      id: crypto.randomUUID(),
      userId: command.userId,
      title: command.title,
      description: command.description,
      isRead: false,
      priority: command.priority,
      type: command.type,
      metadata: command.metadata,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };
}
