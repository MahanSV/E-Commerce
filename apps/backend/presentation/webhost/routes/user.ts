import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import {createUser, deleteUser, getAllUsers, getUser, getUserByEmail, updateUser} from "#webhost/controllers/user.ts";


const router = express.Router();

router.get('/', authenticate, getAllUsers);

router.post('/', authenticate, createUser);

router.get('/:id', authenticate, getUser);

router.put('/:id', authenticate, updateUser);

router.delete('/:id', authenticate, deleteUser);

router.get('/email/:email', authenticate, getUserByEmail);

export default router;