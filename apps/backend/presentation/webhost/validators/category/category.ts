import { z } from 'zod';


const createCategorySchema = z.object({
    name: z.string().optional()
});

const getCategorySchema = z.object({
    id: z.string().optional()
});

const updateCategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().optional()
});

const deleteCategorySchema = z.object({
    id: z.string().optional(),
});

export {
    createCategorySchema,
    getCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
};
