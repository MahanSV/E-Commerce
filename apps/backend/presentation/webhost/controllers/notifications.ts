import type { Request, Response } from 'express';
import ApiError from "#webhost/errors/apiError.ts";
import {NotificationService} from "#application/services/Notification.ts";

class NotificationsController {
    private notificationService: NotificationService;

    constructor(notificationService = new NotificationService()) {
        this.notificationService = notificationService;
    };

    public async getUnreadCount(req: Request, res: Response): Promise<any> {
        /*const { userId } = req.params;*/
        try {
            const userId = req.params.userId;

            const unreadCount = await this.notificationService.getUnreadCount(userId);

            res.json({unreadCount});
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async getUserNotifications(req: Request, res: Response): Promise<any> {
        /*const { userId } = req.params;*/
        try {
            const userId = req.params.userId;

            const userNotifications = await this.notificationService.getUserNotifications(userId);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async createNotification(req: Request, res: Response): Promise<any> {
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
            if (error instanceof ApiError) throw error;
        }
    };

    public async bulkMarkAsRead(req: Request, res: Response): Promise<any> {
        /*const { notificationIds, userId } = req.body;*/
        try {
            const { notificationIds, userId } = req.body;

            const updateResult = await this.notificationService.bulkMarkAsRead(notificationIds, userId);

            res.json({
                message: `${updateResult} notifications marked as read`,
                updatedCount: updateResult
            });
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async bulkDeleteNotifications(req: Request, res: Response): Promise<any> {
        /*const { notificationIds, userId } = req.body;*/
        try {
            const { notificationIds, userId } = req.body;

            const deletedNotifications = await this.notificationService.bulkDeleteNotifications(notificationIds, userId);

            res.json({
                message: `${deletedNotifications} notifications deleted`,
                deletedCount: deletedNotifications
            });
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async updateNotification(req: Request, res: Response): Promise<any> {
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
            if (error instanceof ApiError) throw error;
        }
    };

    public async deleteNotification(req: Request, res: Response): Promise<any> {
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
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new NotificationsController();