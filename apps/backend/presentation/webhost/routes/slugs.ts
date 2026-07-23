import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SlugController from '#webhost/controllers/slug.ts'

const router = express.Router();

router.get('/:slug', authenticate, SlugController.getProductBySlug);

export default router;