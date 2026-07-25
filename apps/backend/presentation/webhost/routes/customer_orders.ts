import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CustomerOrdersController from '#webhost/controllers/customer_orders.ts'

const router = express.Router();

router.get('/', authenticate, CustomerOrdersController.getAllOrders);

router.post('/', authenticate, CustomerOrdersController.createCustomerOrder);

router.get('/:id', authenticate, CustomerOrdersController.getCustomerOrder);

router.put('/:id', authenticate, CustomerOrdersController.updateCustomerOrder);

router.delete('/:id', authenticate, CustomerOrdersController.deleteCustomerOrder);

export default router;