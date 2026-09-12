import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CustomerOrdersController from '#webhost/controllers/customer_orders.ts'
import validate from "#middlewares/validation.ts";
import {
    createCustomerOrderSchema, deleteCustomerOrderSchema, getCustomerOrderSchema,
    updateCustomerOrderSchema
} from "#webhost/validators/customer_orders/customer_orders.ts";
import normalizeBody from "#middlewares/normalizeBody.ts";

const router = express.Router();

router.get('/', /*authenticate,*/ CustomerOrdersController.getAllOrders);

router.post(
    '/',
    // authenticate,
    validate(createCustomerOrderSchema),
    CustomerOrdersController.createCustomerOrder
);

router.get(
    '/:id',
    // authenticate,
    validate(getCustomerOrderSchema),
    CustomerOrdersController.getCustomerOrder
);

router.put(
    '/:id',
    // authenticate,
    normalizeBody,
    validate(updateCustomerOrderSchema),
    CustomerOrdersController.updateCustomerOrder
);

router.delete(
    '/:id',
    // authenticate,
    validate(deleteCustomerOrderSchema),
    CustomerOrdersController.deleteCustomerOrder
);

export default router;