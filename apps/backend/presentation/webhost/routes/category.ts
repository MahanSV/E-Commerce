import express from 'express';
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import CategoryController from '#webhost/controllers/category.ts';
import validate from "#middlewares/validation.ts";
import {
    createCategorySchema,
    deleteCategorySchema,
    getCategorySchema,
    updateCategorySchema,
    categoryDTOSchema
} from "#webhost/validators/category/category.ts";
import { z } from 'zod';

const router = express.Router();
const api = createApiRouter(router, '/categories');

api.get(
    '/',
    {
        tags: ['Categories'],
        responses: {
            200: {
                description: 'List of categories',
                content: { 'application/json': { schema: z.array(categoryDTOSchema) } }
            }
        }
    },
    /*authenticate,*/
    CategoryController.getAllCategories
);

api.post(
    '/',
    {
        tags: ['Categories'],
        request: {
            body: { content: { 'application/json': { schema: createCategorySchema } } }
        },
        responses: {
            201: {
                description: 'Category created successfully',
                content: { 'application/json': { schema: categoryDTOSchema } }
            }
        }
    },
    /*authenticate,*/
    validate(createCategorySchema),
    CategoryController.createCategory
);

api.get(
    '/:id',
    {
        tags: ['Categories'],
        request: { params: z.object({ id: z.string() }) },
        responses: {
            200: {
                description: 'Object with category',
                content: { 'application/json': { schema: categoryDTOSchema } }
            },
            404: { description: 'Failed to find Category.' }
        }
    },
    /*authenticate,*/
    validate(getCategorySchema),
    CategoryController.getCategory
);

api.put(
    '/:id',
    {
        tags: ['Categories'],
        request: {
            params: z.object({ id: z.string() }),
            body: { content: { 'application/json': { schema: updateCategorySchema } } }
        },
        responses: {
            200: {
                description: 'Category updated successfully',
                content: { 'application/json': { schema: categoryDTOSchema } }
            },
            404: {
                description: 'Failed to find Category.'
            },
            500: {
                description: 'Failed to update Category.'
            }
        }
    },
    /*authenticate,*/
    validate(updateCategorySchema),
    CategoryController.updateCategory
);

api.delete(
    '/:id',
    {
        tags: ['Categories'],
        request: { params: z.object({ id: z.string() }) },
        responses: {
            204: { description: 'Category deleted successfully' },
            400: { description: "Category doesn't exist." },
            500: { description: "Failed to delete Category." }
        }
    },
    /*authenticate,*/
    validate(deleteCategorySchema),
    CategoryController.deleteCategory
);

export default router;