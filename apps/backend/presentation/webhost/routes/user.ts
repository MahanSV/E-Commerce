import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import UserController from '#webhost/controllers/user.ts';
import {
    createUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
    getUserSchema,
    updateUserSchema
} from "#webhost/validators/user/user.ts";
import validate from "#middlewares/validation.ts";


const router = express.Router();

router.get('/', /*authenticate,*/ UserController.getAllUsers);

router.post(
    '/',
    // authenticate,
    validate(createUserSchema),
    UserController.createUser
);

router.get(
    '/:id',
    // authenticate,
    validate(getUserSchema),
    UserController.getUser
);

router.put(
    '/:id',
    // authenticate,
    validate(updateUserSchema),
    UserController.updateUser
);

router.delete(
    '/:id',
    // authenticate,
    validate(deleteUserSchema),
    UserController.deleteUser
);

router.get(
    '/email/:email',
    // authenticate,
    validate(getUserByEmailSchema),
    UserController.getUserByEmail
);

export default router;