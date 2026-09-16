import { z } from 'zod';

const getMerchantByIdSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const createMerchantSchema = z.object({
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." }),
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
    phone: z.string({ error: "phone is required." }).min(1, { error: "phone is required." }),
    address: z.string({ error: "address is required." }).min(1, { error: "address is required." }),
    description: z.string({ error: "description is required." }).min(1, { error: "description is required." }),
    status: z.string({ error: "status is required." }).min(1, { error: "status is required." }),
});

const updateMerchantSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
    name: z.string({ error: "name is required." }).min(1, { error: "name is required." }),
    email: z.string({ error: "email is required." }).min(1, { error: "email is required." }),
    phone: z.string({ error: "phone is required." }).min(1, { error: "phone is required." }),
    address: z.string({ error: "address is required." }).min(1, { error: "address is required." }),
    description: z.string({ error: "description is required." }).min(1, { error: "description is required." }),
    status: z.string({ error: "status is required." }).min(1, { error: "status is required." }),
});

const deleteMerchantSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." })
});

export {
    getMerchantByIdSchema,
    createMerchantSchema,
    updateMerchantSchema,
    deleteMerchantSchema,
}
