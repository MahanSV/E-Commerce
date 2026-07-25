import yup from 'yup';

const createCustomerOrder = yup.object({});

const updateCustomerOrder = yup.object({
    id: yup.string().required("id is required."),
});

const deleteCustomerOrder = yup.object({
    id: yup.string().required("id is required."),
});

const getCustomerOrder = yup.object({
    id: yup.string().required("id is required."),
});

export {
    createCustomerOrder,
    updateCustomerOrder,
    deleteCustomerOrder,
    getCustomerOrder,
};
