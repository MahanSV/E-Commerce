import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {createImage, deleteImage, getSingleProductImages, updateImage} from "#webhost/controllers/productImages.ts";


const router = express.Router();

router.get('/:id', authenticate, getSingleProductImages);


router.post('/', authenticate, createImage);


router.put('/:id', authenticate, updateImage);


router.delete('/:id', authenticate, deleteImage);

export default router;