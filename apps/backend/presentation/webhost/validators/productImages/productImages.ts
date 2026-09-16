import { z } from 'zod';

const getSingleProductImagesSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const createImageSchema = z.object({
    productID: z.string({ error: "productID is required." }).min(1, { error: "productID is required." }),
    image: z.string({ error: "image is required." }).min(1, { error: "image is required." }),
});

const updateImageSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
    productID: z.string({ error: "productID is required." }).min(1, { error: "productID is required." }),
    image: z.string({ error: "image is required." }).min(1, { error: "image is required." }),
});

const deleteImageSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

export {
    getSingleProductImagesSchema,
    createImageSchema,
    updateImageSchema,
    deleteImageSchema,
}
