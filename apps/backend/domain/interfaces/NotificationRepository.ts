import Notification from "#models/Notification.ts";
import {notificationQuery, updateNotificationCommand} from "#application/types/notification/command.ts";


export interface NotificationRepositoryInterface {
    getNotificationById(id: string): Promise<Notification | null>;
    getUnreadCount(userId: string): Promise<number>
    getUserNotifications (userId: string, query: notificationQuery): Promise<{
        notifications: Notification[],
        total: number,
        page: number,
        totalPages: number,
        unreadCount: number
    }>;
    createNotification(notificationModel: Notification): Promise<Notification>;
    bulkMarkAsRead(notificationIds: string[], userId: string): Promise<number>
    getNotificationByIdAndUserId(id: string, userId: string): Promise<Notification | null>
    getNotificationByUserId(userId: string): Promise<Notification[]>
    updateNotification(command: updateNotificationCommand): Promise<Notification>
    bulkDeleteNotifications(notificationIds: string[], userId: string): Promise<number>
    deleteNotification(id: string): Promise<Notification>
}