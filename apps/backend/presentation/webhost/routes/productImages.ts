import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import ProductImageController from '#webhost/controllers/productImages.ts';
import validate from "#middlewares/validation.ts";
import {
    createImageSchema, deleteImageSchema,
    getSingleProductImagesSchema, productImageDTOSchema,
    updateImageSchema
} from "#webhost/validators/productImages/productImages.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {errorSchema} from "#webhost/validators/errorSchema.ts";


const router = express.Router();
const api  = createApiRouter(router, '/images');
// TODO: Test openapi doc's
api.get(
    '/:id',
    {
        tags: ['Product Images'],
        request: {
            params: getSingleProductImagesSchema
        },
        responses: {
            200: {
                description: 'List of Product Images',
                content: {
                    'application/json': { schema: z.array(productImageDTOSchema).nullable() },
                }
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
    validate(getSingleProductImagesSchema),
    ProductImageController.getSingleProductImages
);

api.post(
    '/',
    {
        tags: ['Product Images'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: createImageSchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'add product Image',
                content: {
                    'application/json': { schema: z.array(productImageDTOSchema).nullable() }
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
    validate(createImageSchema),
    ProductImageController.createImage
);

api.put(
    '/:id',
    {
        tags: ['Product Images'],
        request: {
            params: updateImageSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': {
                        schema: updateImageSchema.omit({ id: true })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'add product Image',
                content: {
                    'application/json': { schema: z.array(productImageDTOSchema).nullable() }
                }
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                }
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                }
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
    validate(updateImageSchema),
    ProductImageController.updateImage
);

api.delete(
    '/:id',
    {
        tags: ['Product Images'],
        request: {
            params: deleteImageSchema
        },
        responses: {
            204: {
                description: 'Delete a product Image',
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                }
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
    validate(deleteImageSchema),
    ProductImageController.deleteImage
);

export default router;