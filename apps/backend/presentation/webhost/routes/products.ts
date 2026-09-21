import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import ProductController from '#webhost/controllers/products.ts';
import validate from "#middlewares/validation.ts";
import {
    createProductSchema, deleteProductSchema,
    getAllProductsSchema,
    getProductByIdSchema, productDTOSchema, updateProductSchema
} from "#webhost/validators/products/products.ts";
import {createApiRouter} from "#webhost/docs/openApiRouter.js";
import {z} from "zod";
import {errorSchema} from "#webhost/validators/errorSchema.js";

const router = express.Router();
const api = createApiRouter(router, '/products');
// TODO: Test openapi doc's
api.get(
    '/',
    {
        tags: ['Products'],
        request: {
            query: z.object({
                mode: z.string().optional(),
                page: z.string().optional(),
            })
        },
        responses: {
            200: {
                description: 'List of Products',
                content: {
                    'application/json': { schema: z.array(productDTOSchema) }
                }
            },
        }
    },
    // authenticate,
    validate(getAllProductsSchema),
    ProductController.getAllProducts
);

api.post(
    '/',
    {
        tags: ['Products'],
        request: {
            body: {
                content: {
                    'application/json': { schema: createProductSchema }
                }
            }
        },
        responses: {
            201: {
                description: 'add product',
                content: {
                    'application/json': { schema: productDTOSchema }
                }
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
            409: {
                description: 'CONFLICT',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(createProductSchema),
    ProductController.createProduct
);

api.get(
    '/:id',
    {
        tags: ['Products'],
        request: {
            params: getProductByIdSchema
        },
        responses: {
            200: {
                description: 'Single Product',
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
        },
    },
    // authenticate,
    validate(getProductByIdSchema),
    ProductController.getProductById
);

api.put(
    '/:id',
    {
        tags: ['Products'],
        request: {
            params: updateProductSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': {
                        schema: updateProductSchema.omit({ id: true })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Update Product',
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
    validate(updateProductSchema),
    ProductController.updateProduct
);

api.delete(
    '/:id',
    {
        tags: ['Products'],
        request: {
            params: deleteProductSchema
        },
        responses: {
            204: {
                description: 'Delete Product',
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(deleteProductSchema),
    ProductController.deleteProduct
);

export default router;