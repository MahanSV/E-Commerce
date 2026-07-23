import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CustomerOrderProductController from '#webhost/controllers/customer_order_product.ts'

const router = express.Router();

router.get('/', authenticate, CustomerOrderProductController.getAllProductOrders);

router.post('/' ,authenticate, CustomerOrderProductController.createOrderProduct);

router.get('/:id', authenticate, CustomerOrderProductController.getProductOrder);

router.put('/:id', authenticate, CustomerOrderProductController.updateProductOrder);

router.delete('/:id', authenticate, CustomerOrderProductController.deleteProductOrder);

export default router;