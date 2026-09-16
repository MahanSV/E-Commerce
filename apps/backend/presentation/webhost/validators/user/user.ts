import { z } from 'zod';

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

export {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
}
