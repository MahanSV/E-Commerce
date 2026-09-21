import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CustomerOrderProductController from '#webhost/controllers/customer_order_product.ts'
import validate from "#middlewares/validation.ts";
import {
    createOrderProduct,
    createOrderProductDTOSchema,
    deleteProductOrder,
    getProductOrder,
    orderGroupedDTOSchema,
    orderProductDTOSchema,
    updateProductOrder
} from "#webhost/validators/customer_order_product/customer_order_product.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import {z} from "zod";

const router = express.Router();
const api = createApiRouter(router, '/order-product');

api.get(
    '/',
    {
        tags: ['order-product'],
        responses: {
            200: {
                description: 'Group of product orders.',
                content: { 'application/json': { schema: z.array(orderGroupedDTOSchema) } }
            }
        }
    },
    // authenticate,
    CustomerOrderProductController.getAllProductOrders
);

api.post(
    '/' ,
    {
        tags: ['order-product'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: createOrderProduct
                    }
                }
            }
        },
        responses: {
            201: {
                description: 'add single product orders.',
                content: { 'application/json': { schema: createOrderProductDTOSchema } }
            }
        }
    },
    // authenticate,
    validate(createOrderProduct),
    CustomerOrderProductController.createOrderProduct
);

api.get(
    '/:id',
    {
        tags: ['order-product'],
        request: {
            params: z.object({ id: z.string() })
        },
        responses: {
            200: {
                description: 'Single product orders.',
                content: { 'application/json': { schema: z.array(orderProductDTOSchema) } }
            }
        }
    },
    // authenticate,
    validate(getProductOrder),
    CustomerOrderProductController.getProductOrder
);
// TODO: Check update openapi test!
api.put(
    '/:id',
    {
        tags: ['order-product'],
        request: {
            params: z.object({ id: z.string() }),
            body: {
                content: {
                    'application/json': {
                        schema: updateProductOrder.omit(({ id: true }))
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'update product orders.',
                content: { 'application/json': { schema: orderProductDTOSchema } }
            }
        }
    },
    // authenticate,
    validate(updateProductOrder),
    CustomerOrderProductController.updateProductOrder
);

api.delete(
    '/:id',
    {
        tags: ['order-product'],
        request: {
            params: z.object({ id: z.string() })
        },
        responses: {
            204: { description: 'Delete product order.' },
            404: { description: 'Order not found' }
        }
    },
    // authenticate,
    validate(deleteProductOrder),
    CustomerOrderProductController.deleteProductOrder
);

export default router;