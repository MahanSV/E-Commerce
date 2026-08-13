import yup from 'yup';

const createCustomerOrderSchema = yup.object({
    name: yup.string().required("name is required."),
    lastname: yup.string().required("lastname is required."),
    phone: yup.string().required("phone is required."),
    email: yup.string().required("email is required."),
    company: yup.string().required("company is required."),
    adress: yup.string().required("adress is required."),
    apartment: yup.string().required("apartment is required."),
    postalCode: yup.string().required("postalCode is required."),
    status: yup.string().required("status is required."),
    total: yup.string().required("total is required."),
    city: yup.string().required("city is required."),
    country: yup.string().required("country is required."),
    orderNotice: yup.string().required("orderNotice is required."),
    userId: yup.string().required("userId is required."),
});

const updateCustomerOrderSchema = yup.object({
    id: yup.string().required("id is required."),
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
