import {NotificationPriority, NotificationType} from "#domain/enums/notification.ts";

export type createNotificationCommand = {
    userId: string;
    title: string;
    description: string;
    type: NotificationType;
    priority: NotificationPriority;
    metadata: any;
};

export type updateNotificationCommand = {
    id: string;
    isRead: boolean;
};

export type deleteNotificationCommand = {
    id: string;
    userId: string;
};