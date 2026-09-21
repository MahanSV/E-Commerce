import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import UserController from '#webhost/controllers/user.ts';
import {
    createUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
    getUserSchema,
    updateUserSchema,
    simpleUserDTO,
    userDTOSchema,
} from "#webhost/validators/user/user.ts";
import validate from "#middlewares/validation.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {errorSchema} from "#webhost/validators/errorSchema.ts";

const router = express.Router();
const api = createApiRouter(router, '/users');
// TODO: Test openapi doc's
api.get(
    '/',
    {
        tags: ['Users'],
        responses: {
            200: {
                description: 'List of all users',
                content: {
                    'application/json': { schema: z.array(simpleUserDTO) }
                }
            }
        }
    },
    // authenticate,
    UserController.getAllUsers
);

api.post(
    '/',
    {
        tags: ['Users'],
        request: {
            body: {
                content: {
                    'application/json': { schema: createUserSchema }
                }
            }
        },
        responses: {
            201: {
                description: 'add user',
                content: {
                    'application/json': { schema: simpleUserDTO }
                }
            }
        }
    },
    // authenticate,
    validate(createUserSchema),
    UserController.createUser
);

api.get(
    '/:id',
    {
        tags: ['Users'],
        request: {
            params: getUserSchema
        },
        responses: {
            200: {
                description: 'Single user',
                content: {
                    'application/json': { schema: simpleUserDTO }
                }
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(getUserSchema),
    UserController.getUser
);

api.put(
    '/:id',
    {
        tags: ['Users'],
        request: {
            params: updateUserSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': {
                        schema: updateUserSchema.omit({ id: true })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Update user',
                content: {
                    'application/json': { schema: userDTOSchema }
                }
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(updateUserSchema),
    UserController.updateUser
);

api.delete(
    '/:id',
    {
        tags: ['Users'],
        request: {
            params: deleteUserSchema
        },
        responses: {
            200: {
                description: 'Delete user',
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(deleteUserSchema),
    UserController.deleteUser
);

api.get(
    '/email/:email',
    {
        tags: ['Users'],
        request: {
            params: getUserByEmailSchema
        },
        responses: {
            200: {
                description: 'get user by email',
                content: {
                    'application/json': { schema: userDTOSchema }
                }
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(getUserByEmailSchema),
    UserController.getUserByEmail
);

export default router;