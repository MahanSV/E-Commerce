import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SlugController from '#webhost/controllers/slug.ts';
import validate from "#middlewares/validation.ts";
import {getProductBySlugSchema} from "#webhost/validators/slugs/slugs.ts";

const router = express.Router();

router.get(
    '/:slug',
    authenticate,
    validate(getProductBySlugSchema),
    SlugController.getProductBySlug
);

export default router;