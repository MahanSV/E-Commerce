import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SearchController from '#webhost/controllers/search.ts';
import validate from "#middlewares/validation.ts";
import {searchProductsSchema} from "#webhost/validators/search/search.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {productDTOSchema} from "#webhost/validators/products/products.ts";


const router = express.Router();
const api  = createApiRouter(router, '/search');

// TODO: Test openapi doc's
api.get(
    '/',
    {
        tags: ['Search products'],
        request: {
            query: searchProductsSchema
        },
        responses: {
            200: {
                description: 'Search products successfully.',
                content: {
                    'application/json': { schema:  z.array(productDTOSchema) }
                }
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: z.object({
                            error: z.string()
                        })
                    }
                }
            }
        }
    },
    // authenticate,
    validate(searchProductsSchema),
    SearchController.searchProducts
);

export default router;