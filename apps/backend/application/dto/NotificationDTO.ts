import {UserDTO} from "#application/dto/UserDTO.ts";
import {NotificationPriority, NotificationType } from "#domain/enums/notification.ts";


export interface NotificationDTO {
    id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    priority: NotificationPriority;
    type: NotificationType;
    metadata?: any;
    createdAt: Date;
    updatedAt: Date;
    user?: UserDTO;
}