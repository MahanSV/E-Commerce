import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import MerchantController from '#webhost/controllers/merchant.ts';
import validate from "#middlewares/validation.ts";
import {
    createMerchantSchema, deleteMerchantSchema,
    getMerchantByIdSchema, merchantDTOSchema,
    updateMerchantSchema
} from "#webhost/validators/mercahnt/merchant.ts";
import normalizeBody from '#middlewares/normalizeBody.ts';
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {errorSchema} from "#webhost/validators/errorSchema.ts";

const router = express.Router();
const api = createApiRouter(router, '/merchants');

// Get all merchants
api.get(
    "/",
    {
        tags: ['merchants'],
        responses: {
            200: {
                description: 'List of Merchants',
                content: {
                    'application/json': { schema: z.array(merchantDTOSchema) }
                }
            }
        }
    },
    // authenticate,
    MerchantController.getAllMerchants
);

// Get a specific merchant by ID
api.get(
    "/:id",
    {
        tags: ['merchants'],
        request: { params: z.object({ id: z.string() }) },
        responses: {
            200: {
                description: 'Single Merchants',
                content: {
                    'application/json': { schema: merchantDTOSchema }
                }
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': { schema: errorSchema }
                }
            }
        }
    },
    // authenticate,
    validate(getMerchantByIdSchema),
    MerchantController.getMerchantById
);

// Create a new merchant
api.post(
    "/",
    {
        tags: ['merchants'],
        request: {
            body: {
                content: {
                    'application/json': { schema: createMerchantSchema }
                }
            }
        },
        responses: {
            201: {
                description: 'add Merchant',
                content: {
                    'application/json': { schema: merchantDTOSchema }
                }
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': { schema: errorSchema }
                }
            }
        }
    },
    // authenticate,
    normalizeBody,
    validate(createMerchantSchema),
    MerchantController.createMerchant
);

// Update a merchant
api.put(
    "/:id",
    {
        tags: ['merchants'],
        request: {
            params: updateMerchantSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': { schema: updateMerchantSchema.omit({ id: true }) }
                }
            }
        },
        responses: {
            200: {
                description: 'Update Merchant',
                content: {
                    'application/json': { schema: merchantDTOSchema }
                }
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': { schema: errorSchema }
                }
            }
        }
    },
    // authenticate,
    validate(updateMerchantSchema),
    MerchantController.updateMerchant
);

// Delete a merchant
api.delete(
    "/:id",
    {
        tags: ['merchants'],
        request: {
            params: z.object({ id: z.string() })
        },
        responses: {
            204: {
                description: 'Delete single Merchant',
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': { schema: errorSchema }
                }
            }
        }
    },
    // authenticate,
    validate(deleteMerchantSchema),
    MerchantController.deleteMerchant
);

export default router;