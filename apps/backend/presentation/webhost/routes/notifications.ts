import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import NotificationsController from '#webhost/controllers/notifications.ts';
import validate from "#middlewares/validation.ts";
import {
    bulkDeleteNotificationsSchema,
    bulkMarkAsReadSchema,
    createNotificationSchema, deleteNotificationSchema,
    getUnreadCountSchema,
    getUserNotificationsSchema, updateNotificationSchema
} from "#webhost/validators/notifications/notifications.ts";

const router = express.Router();

// GET /api/notifications/:userId/unread-count - Get unread notification count
router.get(
    '/:userId/unread-count',
    authenticate,
    validate(getUnreadCountSchema),
    NotificationsController.getUnreadCount
);

// GET /api/notifications/:userId - Get user notifications with filtering and pagination
router.get(
    '/:userId',
    authenticate,
    validate(getUserNotificationsSchema),
    NotificationsController.getUserNotifications
);

// POST /api/notifications - Create new notification
router.post('/',
    authenticate,
    validate(createNotificationSchema),
    NotificationsController.createNotification
);

// POST /api/notifications/mark-read - Bulk mark notifications as read
router.post(
    '/mark-read',
    authenticate,
    validate(bulkMarkAsReadSchema),
    NotificationsController.bulkMarkAsRead
);

// DELETE /api/notifications/bulk - Bulk delete notifications
router.delete(
    '/bulk',
    authenticate,
    validate(bulkDeleteNotificationsSchema),
    NotificationsController.bulkDeleteNotifications
);

// PUT /api/notifications/:id - Update notification (mark as read/unread)
router.put(
    '/:id',
    authenticate,
    validate(updateNotificationSchema),
    NotificationsController.updateNotification
);

// DELETE /api/notifications/:id - Delete single notification
router.delete(
    '/:id',
    authenticate,
    validate(deleteNotificationSchema),
    NotificationsController.deleteNotification
);


export default router;