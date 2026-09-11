import { NotificationDTO } from "#application/dto/NotificationDTO.ts"
import {
    createNotificationCommand,
    deleteNotificationCommand, notificationQuery,
    updateNotificationCommand
} from "#application/types/notification/command.ts";


export interface NotificationServiceInterface {
    getUnreadCount(userId: string): Promise<number>
    getUserNotifications(userId: string, query: notificationQuery): Promise<{
        notifications: NotificationDTO[],
        total: number,
        page: number,
        totalPages: number,
        unreadCount: number
    }>
    createNotification(command: createNotificationCommand): Promise<NotificationDTO>
    bulkMarkAsRead(notificationIds: string[], userId: string): Promise<number>
    bulkDeleteNotifications(notificationIds: string[], userId: string): Promise<number>
    updateNotification(command: updateNotificationCommand): Promise<NotificationDTO>
    deleteNotification(command: deleteNotificationCommand): Promise<void>
}