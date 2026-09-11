import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import ProductImageController from '#webhost/controllers/productImages.ts';
import validate from "#middlewares/validation.ts";
import {
    createImageSchema, deleteImageSchema,
    getSingleProductImagesSchema,
    updateImageSchema
} from "#webhost/validators/productImages/productImages.ts";


const router = express.Router();

router.get(
    '/:id',
    // authenticate,
    validate(getSingleProductImagesSchema),
    ProductImageController.getSingleProductImages
);

router.post(
    '/',
    // authenticate,
    validate(createImageSchema),
    ProductImageController.createImage
);

router.put(
    '/:id',
    // authenticate,
    validate(updateImageSchema),
    ProductImageController.updateImage
);

router.delete(
    '/:id',
    // authenticate,
    validate(deleteImageSchema),
    ProductImageController.deleteImage
);

export default router;