import { z } from 'zod';


const getUnreadCountSchema = z.object({
    userId: z.string({ error: "userId is required." }).min(1, { error: "userId is required." }),
});

const getUserNotificationsSchema = z.object({
    userId: z.string({ error: "userId is required." }).min(1, { error: "userId is required." }),
});

const createNotificationSchema = z.object({
    userId: z.string({ error: "userId is required." }).min(1, { error: "userId is required." }),
    title: z.string({ error: "title is required." }).min(1, { error: "title is required." }),
    message: z.string({ error: "message is required." }).min(1, { error: "message is required." }),
    type: z.enum(["ORDER_UPDATE", "PAYMENT_STATUS", "PROMOTION", "SYSTEM_ALERT"], { error: "type is required." }),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
    metadata: z.object({}).nullable().optional(),
});

const bulkMarkAsReadSchema = z.object({
    userId: z.string({ error: "userId is required." }).min(1, { error: "userId is required." }),
    notificationIds: z.array(z.unknown(), { error: "notificationIds is required." }),
});

const bulkDeleteNotificationsSchema = z.object({
    userId: z.string({ error: "userId is required." }).min(1, { error: "userId is required." }),
    notificationIds: z.array(z.unknown(), { error: "notificationIds is required." }),
});

const updateNotificationSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
    isRead: z.boolean({ error: "isRead is required." }),
});

const deleteNotificationSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
    userId: z.string({ error: "userId is required." }).min(1, { error: "userId is required." }),
});

export {
    getUnreadCountSchema,
    getUserNotificationsSchema,
    createNotificationSchema,
    bulkMarkAsReadSchema,
    bulkDeleteNotificationsSchema,
    updateNotificationSchema,
    deleteNotificationSchema,
}
