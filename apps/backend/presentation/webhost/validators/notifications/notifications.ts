import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {userDTOSchema} from "#webhost/validators/user/user.ts";

extendZodWithOpenApi(z);

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

const notificationDTOSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    message: z.string(),
    isRead: z.boolean(),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
    type: z.enum(["ORDER_UPDATE", "PAYMENT_STATUS", "PROMOTION", "SYSTEM_ALERT"]),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.lazy((): z.ZodType => userDTOSchema)
        .nullable()
        .optional()
        .openapi({
            type: 'object',
            nullable: true,
        }),
});

export {
    getUnreadCountSchema,
    getUserNotificationsSchema,
    createNotificationSchema,
    bulkMarkAsReadSchema,
    bulkDeleteNotificationsSchema,
    updateNotificationSchema,
    deleteNotificationSchema,
    notificationDTOSchema,
}
