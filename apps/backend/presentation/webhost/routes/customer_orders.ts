import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {
    createCustomerOrder, deleteCustomerOrder,
    getAllOrders,
    getCustomerOrder,
    updateCustomerOrder
} from "#webhost/controllers/customer_orders.js";

const router = express.Router();

router.get('/', authenticate, getAllOrders);

router.post('/', authenticate, createCustomerOrder);

router.get('/:id', authenticate, getCustomerOrder);

router.put('/:id', authenticate, updateCustomerOrder);

router.delete('/:id', authenticate, deleteCustomerOrder);

export default router;