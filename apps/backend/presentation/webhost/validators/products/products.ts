import { z } from 'zod';

const getAllProductsSchema = z.object({
    mode: z.string().optional(),
});

const createProductSchema = z.object({
    merchantId: z.string({ error: "merchantId is required." }).min(1, { error: "merchantId is required." }),
    slug: z.string({ error: "slug is required." }).min(1, { error: "slug is required." }),
    title: z.string({ error: "title is required." }).min(1, { error: "title is required." }),
    mainImage: z.string({ error: "mainImage is required." }).min(1, { error: "mainImage is required." }),
    price: z.coerce.number({ error: "price is required." }),
    description: z.string({ error: "description is required." }).min(1, { error: "description is required." }),
    manufacturer: z.string({ error: "manufacturer is required." }).min(1, { error: "manufacturer is required." }),
    categoryId: z.string({ error: "categoryId is required." }).min(1, { error: "categoryId is required." }),
    inStock: z.coerce.number({ error: "inStock is required." }),
});

const getProductByIdSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

const updateProductSchema = z.object({
    id: z.string().optional(),
    merchantId: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    mainImage: z.string().optional(),
    price: z.coerce.number().optional(),
    description: z.string().optional(),
    manufacturer: z.string().optional(),
    categoryId: z.string().optional(),
    inStock: z.coerce.number().optional(),
});

const deleteProductSchema = z.object({
    id: z.string({ error: "id is required." }).min(1, { error: "id is required." }),
});

export {
    getAllProductsSchema,
    createProductSchema,
    getProductByIdSchema,
    updateProductSchema,
    deleteProductSchema,
}
