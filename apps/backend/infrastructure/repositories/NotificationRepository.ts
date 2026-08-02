import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {NotificationRepositoryInterface} from "#domain/interfaces/NotificationRepository.ts";
import Notification from "#models/Notification.ts";
import {updateNotificationCommand} from "#application/types/notification/command.js";


export default class NotificationRepository extends BaseRepository<Notification> implements NotificationRepositoryInterface {
    constructor() {
        super(Notification.createFromSnapshot);
    };

    async getNotificationById(id: string): Promise<Notification | null> {
        const dataModel = await prisma.notification.findUnique({
            where: {id}
        });

        return dataModel && Notification.createFromSnapshot(dataModel);
    };

    async getUnreadCount(userId: string): Promise<number> {
        return await prisma.notification.count({
            where: {
                userId,
                isRead: false
            }
        });
    }

    async createNotification(notificationModel: Notification): Promise<Notification> {
        const dataModel = await prisma.notification.create({
            data: {
                id: notificationModel.id,
                userId: notificationModel.userId,
                title: notificationModel.title,
                description: notificationModel.description,
                type: notificationModel.type,
                isRead: notificationModel.isRead,
                priority: notificationModel.priority,
                // metadata: notificationModel.metadata,
                createdAt: notificationModel.createdAt,
                updatedAt: notificationModel.updatedAt,
            }
        });

        return dataModel && Notification.createFromSnapshot(dataModel);
    };


    async bulkMarkAsRead(notificationIds: string[], userId: string): Promise<number> {
        const dataModels = await prisma.notification.updateMany({
            where: {
                id: { in: notificationIds },
                userId: userId
            },
            data: { isRead: true }
        });

        return dataModels.count;
    };

    async getNotificationByIdAndUserId(id: string, userId: string): Promise<Notification | null> {
        const dataModel = await prisma.notification.findFirst({
            where: {
                id: id,
                userId: userId
            }
        });

        return dataModel && Notification.createFromSnapshot(dataModel);
    };

    async getNotificationByUserId(userId: string): Promise<Notification[]> {
        const dataModels = await prisma.notification.findMany({
            where: {
                userId
            }
        });

        return dataModels.map(data => Notification.createFromSnapshot(data));
    };

    async updateNotification(command: updateNotificationCommand): Promise<Notification> {
        const dataModel = await prisma.notification.update({
            where: {
                id: command.id
            },
            data: {
                isRead: command.isRead
            }
        });

        return dataModel && Notification.createFromSnapshot(dataModel);
    }

    async bulkDeleteNotifications(notificationIds: string[], userId: string): Promise<number> {
        const dataModels = await prisma.notification.deleteMany({
            where: {
                id: { in: notificationIds },
                userId: userId
            }
        });

        return dataModels.count;
    };


    async deleteNotification(id: string): Promise<Notification> {
        const dataModel = await prisma.notification.delete({
            where: {
                id
            }
        });

        return dataModel && Notification.createFromSnapshot(dataModel);
    };
};