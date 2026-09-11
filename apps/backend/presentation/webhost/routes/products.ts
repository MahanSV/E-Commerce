import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import ProductController from '#webhost/controllers/products.ts';
import validate from "#middlewares/validation.ts";
import {
    createProductSchema, deleteProductSchema,
    getAllProductsSchema,
    getProductByIdSchema, updateProductSchema
} from "#webhost/validators/products/products.ts";

const router = express.Router();

router.get(
    '/',
    // authenticate,
    validate(getAllProductsSchema),
    ProductController.getAllProducts
);

router.post(
    '/',
    // authenticate,
    validate(createProductSchema),
    ProductController.createProduct
);

router.get(
    '/:id',
    // authenticate,
    validate(getProductByIdSchema),
    ProductController.getProductById
);

router.put(
    '/:id',
    // authenticate,
    validate(updateProductSchema),
    ProductController.updateProduct
);

router.delete(
    '/:id',
    // authenticate,
    validate(deleteProductSchema),
    ProductController.deleteProduct
);

export default router;