import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import CategoryController from '#webhost/controllers/category.ts';


const router = express.Router();
// TODO: Implement validation Schema
router.get('/', /*authenticate,*/ CategoryController.getAllCategories);

router.post('/', /*authenticate,*/ CategoryController.createCategory);

router.get('/:id', /*authenticate,*/ CategoryController.getCategory);

router.put('/:id', /*authenticate,*/ CategoryController.updateCategory);

router.delete('/:id', /*authenticate,*/ CategoryController.deleteCategory);

export default router;