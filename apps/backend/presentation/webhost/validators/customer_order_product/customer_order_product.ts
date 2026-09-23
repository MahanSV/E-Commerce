import { z } from 'zod';


const createOrderProduct= z.object({
    customerOrderId: z.string({ error: "customerOrderId is required." }).min(1, { error: "customerOrderId is required." }),
    productId: z.string({ error: "productId is required." }).min(1, { error: "productId is required." }),
    quantity: z.coerce.number().positive(),
});

const updateProductOrder= z.object({
    id: z.string().optional(),
    customerOrderId: z.string().optional(),
    productId: z.string().optional(),
    quantity: z.string().optional(),
});

const deleteProductOrder= z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." })
});

const getProductOrder= z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." })
});

export {
    createOrderProduct,
    updateProductOrder,
    deleteProductOrder,
    getProductOrder,
}
