import yup from 'yup';

const getSingleProductImagesSchema = yup.object({
    id: yup.string().required("id is required."),
});

const createImageSchema = yup.object({
    productID: yup.string().required("productID is required."),
    image: yup.string().required("image is required."),
});

const updateImageSchema = yup.object({
    id: yup.string().required("id is required."),
    productID: yup.string().required("productID is required."),
    image: yup.string().required("image is required."),
});

const deleteImageSchema = yup.object({
    id: yup.string().required("id is required."),
});

export {
    getSingleProductImagesSchema,
    createImageSchema,
    updateImageSchema,
    deleteImageSchema,
}