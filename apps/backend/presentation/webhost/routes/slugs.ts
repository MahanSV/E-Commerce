import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SlugController from '#webhost/controllers/slug.ts';
import validate from "#middlewares/validation.ts";
import {getProductBySlugSchema} from "#webhost/validators/slugs/slugs.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import {errorSchema} from "#webhost/validators/errorSchema.ts";
import {productDTOSchema} from "#webhost/validators/products/products.ts";

const router = express.Router();
const api = createApiRouter(router, '/slugs');
// TODO: Test openapi doc's
api.get(
    '/:slug',
    {
        tags: ['Product Slug'],
        request: {
            params: getProductBySlugSchema,
        },
        responses: {
            200: {
                description: 'Product fetch successfully',
                content: {
                    'application/json': { schema: productDTOSchema }
                }
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(getProductBySlugSchema),
    SlugController.getProductBySlug
);

export default router;