import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {
    bulkDeleteNotifications,
    bulkMarkAsRead,
    createNotification, deleteNotification,
    getUnreadCount,
    getUserNotifications, updateNotification
} from "#webhost/controllers/notifications.ts";

const router = express.Router();

// GET /api/notifications/:userId/unread-count - Get unread notification count
router.get('/:userId/unread-count', authenticate, getUnreadCount);

// GET /api/notifications/:userId - Get user notifications with filtering and pagination
router.get('/:userId', authenticate, getUserNotifications);

// POST /api/notifications - Create new notification
router.post('/', authenticate, createNotification);

// POST /api/notifications/mark-read - Bulk mark notifications as read
router.post('/mark-read', authenticate, bulkMarkAsRead);

// DELETE /api/notifications/bulk - Bulk delete notifications
router.delete('/bulk', authenticate, bulkDeleteNotifications);

// PUT /api/notifications/:id - Update notification (mark as read/unread)
router.put('/:id', authenticate, updateNotification);

// DELETE /api/notifications/:id - Delete single notification
router.delete('/:id', authenticate, deleteNotification);


export default router;