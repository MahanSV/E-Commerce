import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import ProductImageController from '#webhost/controllers/productImages.ts';


const router = express.Router();

router.get('/:id', authenticate, ProductImageController.getSingleProductImages);

router.post('/', authenticate, ProductImageController.createImage);

router.put('/:id', authenticate, ProductImageController.updateImage);

router.delete('/:id', authenticate, ProductImageController.deleteImage);

export default router;