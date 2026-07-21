import express from 'express';
import validate from '#middlewares/validation.ts';
import {
    userDetailSchema,
    getUserByNationalIdSchema, addUserSchema,
} from '#application/services/userServices/commandSchemas/index.ts';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {
    addUser,
    getUserById,
    getUserByNationalId,
    getUsers,
    login,
    logout
} from '#webhost/controllers/user.ts';


const router = express.Router();

router.get('/', authenticate, getUsers);

router.get('/:id', authenticate, validate(userDetailSchema), getUserById);

router.get('/:nationalId', authenticate, validate(getUserByNationalIdSchema), getUserByNationalId);

router.post('/', validate(addUserSchema), addUser);

router.post('/login', login);

router.get('/logout', logout);

export default router;