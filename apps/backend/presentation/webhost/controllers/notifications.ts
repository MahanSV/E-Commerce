import type { Request, Response } from 'express';
import {NotificationService} from "#application/services/Notification.ts";

class NotificationsController {
    private notificationService: NotificationService;

    constructor(notificationService = new NotificationService()) {
        this.notificationService = notificationService;
    };

    public getUnreadCount = async (req: Request, res: Response): Promise<any> => {
        /*const { userId } = req.params;*/
        try {
            const userId = req.params.userId;

            const unreadCount = await this.notificationService.getUnreadCount(userId);

            res.json({unreadCount});
        } catch (error) {
            throw error;
        }
    };

    public getUserNotifications = async (req: Request, res: Response): Promise<any> => {
        /*const { userId } = req.params;*/
        try {
            const userId = req.params.userId;

            const query = {
                type: req.query.type?.toString(),
                isRead: req.query.isRead?.toString(),
                search: req.query.search?.toString(),
                page: Number(req.query.page) || 1,
                limit:  Number(req.query.limit) || 10,
                sortBy: req.query.sortBy?.toString() || 'createdAt',
                sortOrder: req.query.sortOrder?.toString() || 'desc',
            };

            const userNotifications = await this.notificationService.getUserNotifications(userId, query);

            res.json(userNotifications);
        } catch (error) {
            throw error;
        }
    };

    public createNotification = async (req: Request, res: Response): Promise<any> => {
        /*const { userId, title, message, type, priority = 'NORMAL', metadata } = req.body;*/
        try {
            const command = {
                userId: req.body.userId,
                title: req.body.title,
                description: req.body.message,
                type: req.body.type,
                priority: req.body.priority || 'NORMAL',
                metadata: req.body.metadata,
            };

            const notification = await this.notificationService.createNotification(command);

            res.status(201).json(notification);
        } catch (error) {
            throw error;
        }
    };

    public bulkMarkAsRead = async (req: Request, res: Response): Promise<any> => {
        /*const { notificationIds, userId } = req.body;*/
        try {
            const { notificationIds, userId } = req.body;

            const updateResult = await this.notificationService.bulkMarkAsRead(notificationIds, userId);

            res.json({
                message: `${updateResult} notifications marked as read`,
                updatedCount: updateResult
            });
        } catch (error) {
            throw error;
        }
    };

    public bulkDeleteNotifications = async (req: Request, res: Response): Promise<any> => {
        /*const { notificationIds, userId } = req.body;*/
        try {
            const { notificationIds, userId } = req.body;

            const deletedNotifications = await this.notificationService.bulkDeleteNotifications(notificationIds, userId);

            res.json({
                message: `${deletedNotifications} notifications deleted`,
                deletedCount: deletedNotifications
            });
        } catch (error) {
            throw error;
        }
    };

    public updateNotification = async (req: Request, res: Response): Promise<any> => {
        /*const { id } = req.params;
        const { isRead } = req.body;*/
        try {
            const command = {
                id: req.params.id,
                isRead: req.body.isRead,
            };

            const notification = await this.notificationService.updateNotification(command);

            res.json(notification);
        } catch (error) {
            throw error;
        }
    };

    public deleteNotification = async (req: Request, res: Response): Promise<any> => {
        /*const { id } = req.params;
        const { userId } = req.body;*/
        try {
            const command = {
                id: req.params.id,
                userId: req.body.userId,
            };

            await this.notificationService.deleteNotification(command);

            res.json({ message: 'Notification deleted successfully' });
        } catch (error) {
            throw error;
        }
    };
}

export default new NotificationsController();