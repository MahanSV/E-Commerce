import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import ProductController from '#webhost/controllers/products.ts';

const router = express.Router();

router.get('/', authenticate, ProductController.getAllProducts);

router.post('/', authenticate, ProductController.createProduct);

router.get('/:id', authenticate, ProductController.getProductById);

router.put('/:id', authenticate, ProductController.updateProduct);

router.delete('/:id', authenticate, ProductController.deleteProduct);

export default router;