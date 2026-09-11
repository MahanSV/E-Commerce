import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import MainImageController from '#webhost/controllers/mainImages.ts';

const router = express.Router();

router.post('/', /*authenticate,*/ MainImageController.uploadMainImage);

export default router;