import yup from 'yup';

const getMerchantByIdSchema = yup.object({
    id: yup.string().required("id is required."),
});

const createMerchantSchema = yup.object({
    name: yup.string().required("name is required."),
    email: yup.string().required("email is required."),
    phone: yup.string().required("phone is required."),
    address: yup.string().required("address is required."),
    description: yup.string().required("description is required."),
    status: yup.string().required("status is required."),
});

const updateMerchantSchema = yup.object({
    id: yup.string().required("id is required."),
    name: yup.string().required("name is required."),
    email: yup.string().required("email is required."),
    phone: yup.string().required("phone is required."),
    address: yup.string().required("address is required."),
    description: yup.string().required("description is required."),
    status: yup.string().required("status is required."),
});

const deleteMerchantSchema = yup.object({
    id: yup.string().required("id is required.")
});

export {
    getMerchantByIdSchema,
    createMerchantSchema,
    updateMerchantSchema,
    deleteMerchantSchema,
}