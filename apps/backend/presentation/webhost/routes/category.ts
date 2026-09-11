import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CategoryController from '#webhost/controllers/category.ts';
import validate from "#middlewares/validation.ts";
import {
    createCategorySchema,
    deleteCategorySchema,
    getCategorySchema,
    updateCategorySchema
} from "#webhost/validators/category/category.ts";


const router = express.Router();

router.get(
    '/',
    /*authenticate,*/
    CategoryController.getAllCategories
);

router.post(
    '/',
    /*authenticate,*/
    validate(createCategorySchema),
    CategoryController.createCategory
);

router.get(
    '/:id',
    /*authenticate,*/
    validate(getCategorySchema),
    CategoryController.getCategory
);

router.put(
    '/:id',
    /*authenticate,*/
    validate(updateCategorySchema),
    CategoryController.updateCategory
);

router.delete(
    '/:id',
    /*authenticate,*/
    validate(deleteCategorySchema),
    CategoryController.deleteCategory
);

export default router;