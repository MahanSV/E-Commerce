import yup from 'yup';

const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

const createCustomerOrderSchema = yup.object({
    name: yup.string().required("name is required.").min(2, "name must be 2-50 chars.").max(50, "name must be 2-50 chars."),
    lastname: yup.string().required("lastname is required.").min(2, "lastname must be 2-50 chars.").max(50, "lastname must be 2-50 chars."),
    phone: yup.string().required("phone is required.").min(10, "phone must be 10-20 chars.").max(20, "phone must be 10-20 chars."),
    email: yup.string().required("email is required.").email("email must be a valid email address."),
    company: yup.string().required("company is required.").min(5, "company must be 5-200 chars.").max(200, "company must be 5-200 chars."),
    adress: yup.string().required("adress is required.").min(5, "adress must be 5-200 chars.").max(200, "adress must be 5-200 chars."),
    apartment: yup.string().required("apartment is required.").min(1, "apartment must be 1-200 chars.").max(200, "apartment must be 1-200 chars."),
    postalCode: yup.string().required("postalCode is required.").min(3, "postalCode must be 3-20 chars.").max(20, "postalCode must be 3-20 chars."),
    city: yup.string().required("city is required.").min(5, "city must be 5-200 chars.").max(200, "city must be 5-200 chars."),
    country: yup.string().required("country is required.").min(5, "country must be 5-200 chars.").max(200, "country must be 5-200 chars."),
    total: yup.number().required("total is required.").positive("total must be greater than 0."),
    status: yup.string().optional().oneOf(orderStatuses, "invalid status value."),
    orderNotice: yup.string().optional().max(500, "orderNotice must be at most 500 chars."),
    userId: yup.string().optional(),
});

const updateCustomerOrderSchema = yup.object({
    id: yup.string().required("id is required."),
    name: yup.string().optional().min(2, "name must be 2-50 chars.").max(50, "name must be 2-50 chars."),
    lastname: yup.string().optional().min(2, "lastname must be 2-50 chars.").max(50, "lastname must be 2-50 chars."),
    phone: yup.string().optional().min(10, "phone must be 10-20 chars.").max(20, "phone must be 10-20 chars."),
    email: yup.string().optional().email("email must be a valid email address."),
    company: yup.string().optional().min(5, "company must be 5-200 chars.").max(200, "company must be 5-200 chars."),
    adress: yup.string().optional().min(5, "adress must be 5-200 chars.").max(200, "adress must be 5-200 chars."),
    apartment: yup.string().optional().min(1, "apartment must be 1-200 chars.").max(200, "apartment must be 1-200 chars."),
    postalCode: yup.string().optional().min(3, "postalCode must be 3-20 chars.").max(20, "postalCode must be 3-20 chars."),
    city: yup.string().optional().min(5, "city must be 5-200 chars.").max(200, "city must be 5-200 chars."),
    country: yup.string().optional().min(5, "country must be 5-200 chars.").max(200, "country must be 5-200 chars."),
    total: yup.number().optional().positive("total must be greater than 0."),
    status: yup.string().optional().oneOf(orderStatuses, "invalid status value."),
    orderNotice: yup.string().optional().max(500, "orderNotice must be at most 500 chars."),
    userId: yup.string().optional(),
});

const deleteCustomerOrderSchema = yup.object({
    id: yup.string().required("id is required."),
});

const getCustomerOrderSchema = yup.object({
    id: yup.string().required("id is required."),
});

export {
    createCustomerOrderSchema,
    updateCustomerOrderSchema,
    deleteCustomerOrderSchema,
    getCustomerOrderSchema,
};
