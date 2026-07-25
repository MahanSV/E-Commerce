import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import UserController from '#webhost/controllers/user.ts';


const router = express.Router();

router.get('/', authenticate, UserController.getAllUsers);

router.post('/', authenticate, UserController.createUser);

router.get('/:id', authenticate, UserController.getUser);

router.put('/:id', authenticate, UserController.updateUser);

router.delete('/:id', authenticate, UserController.deleteUser);

router.get('/email/:email', authenticate, UserController.getUserByEmail);

export default router;