import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CustomerOrdersController from '#webhost/controllers/customer_orders.ts'
import validate from "#middlewares/validation.ts";
import {
    createCustomerOrderSchema, customerOrderDTOSchema, deleteCustomerOrderSchema, getCustomerOrderSchema,
    updateCustomerOrderSchema
} from "#webhost/validators/customer_orders/customer_orders.ts";
import normalizeBody from "#middlewares/normalizeBody.ts";
import {createApiRouter} from "#webhost/docs/openApiRouter.ts";
import {z} from "zod";
import {errorSchema} from "#webhost/validators/errorSchema.ts";

const router = express.Router();
const api = createApiRouter(router, '/orders');

api.get(
    '/',
    {
        tags: ['orders'],
        parameters: [
            {
                name: 'page',
                in: 'query',
                required: false,
                schema: { type: 'integer', default: 1, minimum: 1 }
            },
            {
                name: 'limit',
                in: 'query',
                required: false,
                schema: { type: 'integer', default: 50, minimum: 1, maximum: 100 }
            }
        ],
        responses: {
            200: {
                description: 'List of Orders.',
                content: { 'application/json': {
                    schema: z.object({
                            orders: z.array(customerOrderDTOSchema),
                            pagination: z.object({
                                page: z.number(),
                                limit: z.number(),
                                total: z.number(),
                                totalPages: z.number(),
                            })
                    })
                }
                }
            },
            400: {
                description: 'Invalid pagination parameters',
                content: {
                    'application/json': { schema: errorSchema }
                }
            }
        }
    },
    // authenticate,
    CustomerOrdersController.getAllOrders
);

api.post(
    '/',
    {
        tags: ['orders'],
        request: {
            body: {
                content: {
                    'application/json': { schema: createCustomerOrderSchema }
                }
            }
        },
        responses: {
            201: {
                description: 'add Order.',
                content: { 'application/json': {
                    schema:  z.object({
                            id: z.string(),
                            message: z.string(),
                            orderNumber: z.string(),
                    })
                }
                },
            },
            409: {
                description: 'Duplicate order detected',
                content: {
                    'application/json': { schema: errorSchema }
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
    validate(createCustomerOrderSchema),
    CustomerOrdersController.createCustomerOrder
);

api.get(
    '/:id',
    {
        tags: ['orders'],
        request: { params: z.object({ id: z.string() }) },
        responses: {
            200: {
                description: 'Single Order.',
                content: { 'application/json': {
                        schema:  customerOrderDTOSchema
                    }
                },
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
    validate(getCustomerOrderSchema),
    CustomerOrdersController.getCustomerOrder
);

api.put(
    '/:id',
    {
        tags: ['orders'],
        request: {
            params: updateCustomerOrderSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': { schema: updateCustomerOrderSchema.omit({ id: true }) }
                }
            }
        },
        responses: {
            200: {
                description: 'Update Order.',
                content: {
                    'application/json': {
                        schema: customerOrderDTOSchema
                    }
                }
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': { schema: errorSchema }
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
    validate(updateCustomerOrderSchema),
    CustomerOrdersController.updateCustomerOrder
);

api.delete(
    '/:id',
    {
        tags: ['orders'],
        request: {
            params: z.object({ id: z.string() })
        },
        responses: {
            204: { description: 'Delete Order.' },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': { schema: errorSchema }
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
    validate(deleteCustomerOrderSchema),
    CustomerOrdersController.deleteCustomerOrder
);

export default router;