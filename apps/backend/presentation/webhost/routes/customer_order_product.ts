import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CustomerOrderProductController from '#webhost/controllers/customer_order_product.ts'
import validate from "#middlewares/validation.ts";
import {
    createOrderProduct, deleteProductOrder, getProductOrder,
    updateProductOrder
} from "#webhost/validators/customer_order_product/customer_order_product.ts";

const router = express.Router();

router.get('/', /*authenticate,*/ CustomerOrderProductController.getAllProductOrders);

router.post(
    '/' ,
    // authenticate,
    validate(createOrderProduct),
    CustomerOrderProductController.createOrderProduct
);

router.get(
    '/:id',
    // authenticate,
    validate(getProductOrder),
    CustomerOrderProductController.getProductOrder
);

router.put(
    '/:id',
    // authenticate,
    validate(updateProductOrder),
    CustomerOrderProductController.updateProductOrder
);

router.delete(
    '/:id',
    // authenticate,
    validate(deleteProductOrder),
    CustomerOrderProductController.deleteProductOrder
);

export default router;