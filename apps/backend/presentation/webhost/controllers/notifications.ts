import type { Request, Response } from 'express';
import httpStatus from 'http-status';

class NotificationsController {
    constructor() {};

    public async getUnreadCount(req: Request, res: Response): Promise<any> {
        const { userId } = req.params;
    };

    public async getUserNotifications(req: Request, res: Response): Promise<any> {
        const { userId } = req.params;
    };

    public async createNotification(req: Request, res: Response): Promise<any> {
        const { userId, title, message, type, priority = 'NORMAL', metadata } = req.body;
    };

    public async bulkMarkAsRead(req: Request, res: Response): Promise<any> {
        const { notificationIds, userId } = req.body;
    };

    public async bulkDeleteNotifications(req: Request, res: Response): Promise<any> {
        const { notificationIds, userId } = req.body;

        const command = {};
    };

    public async updateNotification(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { isRead } = req.body;
    };

    public async deleteNotification(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { userId } = req.body;
    };
}

const notificationController = new NotificationsController();

export const getUnreadCount = notificationController.getUnreadCount.bind(notificationController);
export const getUserNotifications = notificationController.getUserNotifications.bind(notificationController);
export const createNotification = notificationController.createNotification.bind(notificationController);
export const bulkMarkAsRead = notificationController.bulkMarkAsRead.bind(notificationController);
export const bulkDeleteNotifications = notificationController.bulkDeleteNotifications.bind(notificationController);
export const updateNotification = notificationController.updateNotification.bind(notificationController);
export const deleteNotification = notificationController.deleteNotification.bind(notificationController);