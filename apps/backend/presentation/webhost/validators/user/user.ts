import { z } from 'zod';
import {bulkUploadBatchDTOSchema} from "#webhost/validators/bulkUpload/bulkUpload.ts";
import {customerOrderDTOSchema} from "#webhost/validators/customer_orders/customer_orders.ts";
import {notificationDTOSchema} from "#webhost/validators/notifications/notifications.ts";
import {wishlistDTOSchema} from "#webhost/validators/wishlist/wishlist.ts";

const createUserSchema = z.object({
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
    password: z.string({ error: "password is required." }).min(1, { error: "password is required." }),
    role: z.string({ error: "role is required." }).min(1, { error: "role is required." }),
});

const getUserSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const updateUserSchema = z.object({
    id: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.string().optional(),
});

const deleteUserSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const getUserByEmailSchema = z.object({
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
});

const userType = z.enum(['admin', 'user', 'merchant']);

const userDTOSchema = z.object({
    id: z.string(),
    name: z.string(),
    lastName: z.string(),
    email: z.string(),
    role: userType,
    mobile: z.string(),
    status: z.string(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),

    orders: z.array(z.lazy((): z.ZodType => customerOrderDTOSchema))
        .nullable()
        .optional(),

    notifications: z.array(z.lazy((): z.ZodType => notificationDTOSchema)).nullable().optional(),

    wishlists: z.array(z.lazy((): z.ZodType => wishlistDTOSchema)).nullable().optional(),

    bulkUploadBatches: z.array(z.lazy((): z.ZodType => bulkUploadBatchDTOSchema)).nullable().optional(),
});

const simpleUserDTO = z.object({
    id: z.string(),
    email: z.string(),
    role: userType
});

export {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
    userDTOSchema,
    simpleUserDTO
}
