import yup from 'yup';


const getUnreadCountSchema = yup.object({
    userId: yup.string().required("userId is required."),
});

const getUserNotificationsSchema = yup.object({
    userId: yup.string().required("userId is required."),
});

const createNotificationSchema = yup.object({
    userId: yup.string().required("userId is required."),
    title: yup.string().required("title is required."),
    message: yup.string().required("message is required."),
    type: yup.string().required("type is required.").oneOf(["ORDER_UPDATE", "PAYMENT_STATUS", "PROMOTION", "SYSTEM_ALERT"]),
    priority: yup.string().optional().oneOf(["LOW", "NORMAL", "HIGH", "URGENT"]),
    metadata: yup.object().optional().nullable(),
});

const bulkMarkAsReadSchema = yup.object({
    userId: yup.string().required("userId is required."),
    notificationIds: yup.array().required("notificationIds is required."),
});

const bulkDeleteNotificationsSchema = yup.object({
    userId: yup.string().required("userId is required."),
    notificationIds: yup.array().required("notificationIds is required."),
});

const updateNotificationSchema = yup.object({
    id: yup.string().required("id is required."),
    isRead: yup.boolean().required("isRead is required."),
});

const deleteNotificationSchema = yup.object({
    id: yup.string().required("id is required."),
    userId: yup.string().required("userId is required."),
});

export {
    getUnreadCountSchema,
    getUserNotificationsSchema,
    createNotificationSchema,
    bulkMarkAsReadSchema,
    bulkDeleteNotificationsSchema,
    updateNotificationSchema,
    deleteNotificationSchema,
}