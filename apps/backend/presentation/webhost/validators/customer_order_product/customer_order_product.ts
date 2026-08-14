import yup from 'yup';


const createOrderProduct= yup.object({
    customerOrderId: yup.string().required("customerOrderId is required."),
    productId: yup.string().required("productId is required."),
    quantity: yup.number().positive(),
});

const updateProductOrder= yup.object({
    id: yup.string(),
    customerOrderId: yup.string(),
    productId: yup.string(),
    quantity: yup.string(),
});

const deleteProductOrder= yup.object({
    id: yup.string().required("id is required.")
});

const getProductOrder= yup.object({
    id: yup.string().required("id is required.")
});

export {
    createOrderProduct,
    updateProductOrder,
    deleteProductOrder,
    getProductOrder,
}