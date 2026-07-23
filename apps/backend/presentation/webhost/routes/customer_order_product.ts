import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {
    createOrderProduct, deleteProductOrder,
    getAllProductOrders,
    getProductOrder,
    updateProductOrder
} from "#webhost/controllers/customer_order_product.ts";

const router = express.Router();

router.get('/', authenticate, getAllProductOrders);

router.post('/' ,authenticate, createOrderProduct);

router.get('/:id', authenticate, getProductOrder);

router.put('/:id', authenticate, updateProductOrder);

router.delete('/:id', authenticate, deleteProductOrder);

export default router;