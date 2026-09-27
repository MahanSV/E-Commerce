import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import NotificationsController from '#webhost/controllers/notifications.ts';
import validate from "#middlewares/validation.ts";
import {
    bulkDeleteNotificationsSchema,
    bulkMarkAsReadSchema,
    createNotificationSchema, deleteNotificationSchema,
    getUnreadCountSchema,
    getUserNotificationsSchema, notificationDTOSchema, updateNotificationSchema
} from "#webhost/validators/notifications/notifications.ts";
import { createApiRouter } from '#webhost/docs/openApiRouter.ts';
import { z } from 'zod';
import {errorSchema} from "#webhost/validators/errorSchema.ts";

const router = express.Router();
const api = createApiRouter(router, '/notifications');

// GET /api/notifications/:userId/unread-count - Get unread notification count
api.get(
    '/:userId/unread-count',
    {
        tags: ['notifications'],
        request: {
            params: z.object({ userId: z.string() }),
        },
        responses: {
            200: {
                description: 'Notification unread counts',
                content: {
                    'application/json': { schema: z.object({ unreadCount: z.number() })}
                }
            }
        }
    },
    // authenticate,
    validate(getUnreadCountSchema),
    NotificationsController.getUnreadCount
);

// GET /api/notifications/:userId - Get user notifications with filtering and pagination
api.get(
    '/:userId',
    {
        tags: ['notifications'],
        request: {
            params: z.object({ userId: z.string() }),
            query: z.object({
                type: z.string().optional(),
                isRead: z.string().optional(),
                search: z.string().optional(),
                page: z.number().optional().default(1),
                limit: z.number().optional().default(10),
                sortBy: z.string().optional().default('createdAt'),
                sortOrder: z.string().optional().default('desc'),
            })
        },
        responses: {
            200: {
                description: 'User notifications.',
                content: {
                    'application/json': {
                        schema: z.object({
                            notifications: z.array(notificationDTOSchema),
                            total: z.number(),
                            page: z.number(),
                            totalPages: z.number(),
                            unreadCount: z.number(),
                        })
                    }
                }
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: z.object({
                            error: z.string()
                        })
                    }
                }
            }
        }
    },
    // authenticate,
    validate(getUserNotificationsSchema),
    NotificationsController.getUserNotifications
);

// POST /api/notifications - Create new notification
api.post('/',
    {
        tags: ['notifications'],
        request: {
            body: {
                content: {
                    'application/json': { schema: createNotificationSchema }
                }
            }
        },
        responses: {
            201: {
                description: 'Create notification',
                content: {
                    'application/json': { schema: notificationDTOSchema }
                }
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': { schema: errorSchema }
                }
            }
        }
    },
    // authenticate,
    validate(createNotificationSchema),
    NotificationsController.createNotification
);

// POST /api/notifications/mark-read - Bulk mark notifications as read
api.post(
    '/mark-read',
    {
        tags: ['notifications'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: bulkMarkAsReadSchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Notifications marked as read successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            message: z.string(),
                            updatedCount: z.number(),
                        })
                    }
                },
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: z.object({
                            error: z.string()
                        })
                    }
                }
            }
        }
    },
    // authenticate,
    validate(bulkMarkAsReadSchema),
    NotificationsController.bulkMarkAsRead
);

// DELETE /api/notifications/bulk - Bulk delete notifications
api.delete(
    '/bulk',
    {
        tags: ['notifications'],
        request: {
            body: {
                content: {
                    'application/json': {
                        schema: bulkDeleteNotificationsSchema
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Notifications deleted successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            message: z.string(),
                            deletedCount: z.number(),
                        })
                    }
                },
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: z.object({
                            error: z.string()
                        })
                    }
                }
            }
        }
    },
    // authenticate,
    validate(bulkDeleteNotificationsSchema),
    NotificationsController.bulkDeleteNotifications
);

// PUT /api/notifications/:id - Update notification (mark as read/unread)
api.put(
    '/:id',
    {
        tags: ['notifications'],
        request: {
            params: updateNotificationSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': {
                        schema: updateNotificationSchema.omit({ id: true })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Notifications updated successfully',
                content: {
                    'application/json': {
                        schema: notificationDTOSchema
                    }
                },
            },
            400: {
                description: 'Bad Request',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(updateNotificationSchema),
    NotificationsController.updateNotification
);

// DELETE /api/notifications/:id - Delete single notification
api.delete(
    '/:id',
    {
        tags: ['notifications'],
        request: {
            params: deleteNotificationSchema.pick({ id: true }),
            body: {
                content: {
                    'application/json': {
                        schema: deleteNotificationSchema.omit({ id: true })
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Notifications deleted successfully',
                content: {
                    'application/json': {
                        schema: z.object({
                            message: z.string(),
                        })
                    }
                },
            },
            404: {
                description: 'Not Found',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
            500: {
                description: 'Internal Server Error',
                content: {
                    'application/json': {
                        schema: errorSchema
                    }
                },
            },
        }
    },
    // authenticate,
    validate(deleteNotificationSchema),
    NotificationsController.deleteNotification
);


export default router;