import type { Request, Response } from 'express';
import httpStatus from 'http-status';

class NotificationsController {
    constructor() {};

    public async getUnreadCount(req: Request, res: Response): Promise<any> {
        /*const { userId } = req.params;*/
        const userId = req.params.userId;
    };

    public async getUserNotifications(req: Request, res: Response): Promise<any> {
        /*const { userId } = req.params;*/
        const userId = req.params.userId;
    };

    public async createNotification(req: Request, res: Response): Promise<any> {
        /*const { userId, title, message, type, priority = 'NORMAL', metadata } = req.body;*/

        const command = {
            userId: req.body.userId,
            title: req.body.title,
            message: req.body.message,
            type: req.body.type,
            priority: req.body.priority || 'NORMAL',
            metadata: req.body.metadata,
        };
    };

    public async bulkMarkAsRead(req: Request, res: Response): Promise<any> {
        /*const { notificationIds, userId } = req.body;*/
        const command = {
            notificationIds: req.body.notificationIds,
            userId: req.body.userId,
        };
    };

    public async bulkDeleteNotifications(req: Request, res: Response): Promise<any> {
        /*const { notificationIds, userId } = req.body;*/
        const command = {
            notificationIds: req.body.notificationIds,
            userId: req.body.userId,
        };
    };

    public async updateNotification(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { isRead } = req.body;*/

        const command = {
            id: req.params.id,
            isRead: req.body.isRead,
        };
    };

    public async deleteNotification(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
        const { userId } = req.body;*/
        const command = {
            id: req.params.id,
            userId: req.body.userId,
        };
    };
}

export default new NotificationsController();