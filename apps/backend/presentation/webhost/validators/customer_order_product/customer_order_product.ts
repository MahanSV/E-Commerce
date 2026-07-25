import yup from 'yup';


const createOrderProduct= yup.object({
    customerOrderId: yup.string().required("customerOrderId is required."),
    productId: yup.string().required("productId is required."),
    quantity: yup.string().required("quantity is required."),
});

const updateProductOrder= yup.object({
    id: yup.string().required("id is required."),
    customerOrderId: yup.string().required("customerOrderId is required."),
    productId: yup.string().required("productId is required."),
    quantity: yup.string().required("quantity is required."),
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