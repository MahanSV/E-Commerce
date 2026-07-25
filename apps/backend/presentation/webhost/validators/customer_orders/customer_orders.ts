import yup from 'yup';

const createCustomerOrderSchema = yup.object({});

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
