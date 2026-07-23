import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "#webhost/controllers/products.ts";

const router = express.Router();

router.get('/', authenticate, getAllProducts);

router.post('/', authenticate, createProduct);

router.get('/:id', authenticate, getProductById);

router.put('/:id', authenticate, updateProduct);

router.delete('/:id', authenticate, deleteProduct);

export default router;