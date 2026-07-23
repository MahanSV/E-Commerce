import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {getProductBySlug} from "#webhost/controllers/slug.ts";

const router = express.Router();

router.get('/:slug', authenticate, getProductBySlug);

export default router;