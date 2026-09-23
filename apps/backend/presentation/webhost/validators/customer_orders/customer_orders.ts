import { z } from 'zod';

const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

const createCustomerOrderSchema = z.object({
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." }).min(2, { error: "name must be 2-50 chars." }).max(50, { error: "name must be 2-50 chars." }),
    lastname: z.string({ error: "lastname is required." }).min(1, { error: "lastname is required." }).min(2, { error: "lastname must be 2-50 chars." }).max(50, { error: "lastname must be 2-50 chars." }),
    phone: z.string({ error: "phone is required." }).min(1, { error: "phone is required." }).min(10, { error: "phone must be 10-20 chars." }).max(20, { error: "phone must be 10-20 chars." }),
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }).email({ error: "email must be a valid email address." }),
    company: z.string({ error: "company is required." }).min(1, { error: "company is required." }).min(5, { error: "company must be 5-200 chars." }).max(200, { error: "company must be 5-200 chars." }),
    adress: z.string({ error: "adress is required." }).min(1, { error: "adress is required." }).min(5, { error: "adress must be 5-200 chars." }).max(200, { error: "adress must be 5-200 chars." }),
    apartment: z.string({ error: "apartment is required." }).min(1, { error: "apartment is required." }).max(200, { error: "apartment must be 1-200 chars." }),
    postalCode: z.string({ error: "postalCode is required." }).min(1, { error: "postalCode is required." }).min(3, { error: "postalCode must be 3-20 chars." }).max(20, { error: "postalCode must be 3-20 chars." }),
    city: z.string({ error: "city is required." }).min(1, { error: "city is required." }).min(5, { error: "city must be 5-200 chars." }).max(200, { error: "city must be 5-200 chars." }),
    country: z.string({ error: "country is required." }).min(1, { error: "country is required." }).min(5, { error: "country must be 5-200 chars." }).max(200, { error: "country must be 5-200 chars." }),
    total: z.coerce.number({ error: "total is required." }).positive({ error: "total must be greater than 0." }),
    status: z.enum(orderStatuses, { error: "invalid status value." }).optional(),
    orderNotice: z.string().max(500, { error: "orderNotice must be at most 500 chars." }).optional(),
    userId: z.string().optional(),
});

const updateCustomerOrderSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
    name: z.string().min(2, { error: "name must be 2-50 chars." }).max(50, { error: "name must be 2-50 chars." }).optional(),
    lastname: z.string().min(2, { error: "lastname must be 2-50 chars." }).max(50, { error: "lastname must be 2-50 chars." }).optional(),
    phone: z.string().min(10, { error: "phone must be 10-20 chars." }).max(20, { error: "phone must be 10-20 chars." }).optional(),
    email: z.string().email({ error: "email must be a valid email address." }).optional(),
    company: z.string().min(5, { error: "company must be 5-200 chars." }).max(200, { error: "company must be 5-200 chars." }).optional(),
    adress: z.string().min(5, { error: "adress must be 5-200 chars." }).max(200, { error: "adress must be 5-200 chars." }).optional(),
    apartment: z.string().min(1, { error: "apartment must be 1-200 chars." }).max(200, { error: "apartment must be 1-200 chars." }).optional(),
    postalCode: z.string().min(3, { error: "postalCode must be 3-20 chars." }).max(20, { error: "postalCode must be 3-20 chars." }).optional(),
    city: z.string().min(5, { error: "city must be 5-200 chars." }).max(200, { error: "city must be 5-200 chars." }).optional(),
    country: z.string().min(5, { error: "country must be 5-200 chars." }).max(200, { error: "country must be 5-200 chars." }).optional(),
    total: z.coerce.number().positive({ error: "total must be greater than 0." }).optional(),
    status: z.enum(orderStatuses, { error: "invalid status value." }).optional(),
    orderNotice: z.string().max(500, { error: "orderNotice must be at most 500 chars." }).optional(),
    userId: z.string().optional(),
});

const deleteCustomerOrderSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const getCustomerOrderSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

export {
    createCustomerOrderSchema,
    updateCustomerOrderSchema,
    deleteCustomerOrderSchema,
    getCustomerOrderSchema,
};
