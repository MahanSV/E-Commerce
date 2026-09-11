import yup from 'yup';

const getAllProductsSchema = yup.object({
    mode: yup.string(),
});

const createProductSchema = yup.object({
    merchantId: yup.string().required("merchantId is required."),
    slug: yup.string().required("slug is required."),
    title: yup.string().required("title is required."),
    mainImage: yup.string().required("mainImage is required."),
    price: yup.number().required("price is required."),
    description: yup.string().required("description is required."),
    manufacturer: yup.string().required("manufacturer is required."),
    categoryId: yup.string().required("categoryId is required."),
    inStock: yup.number().required("inStock is required."),
});

const getProductByIdSchema = yup.object({
    id: yup.string().required("id is required."),
});

const updateProductSchema = yup.object({
    id: yup.string(),
    merchantId: yup.string(),
    slug: yup.string(),
    title: yup.string(),
    mainImage: yup.string(),
    price: yup.number(),
    description: yup.string(),
    manufacturer: yup.string(),
    categoryId: yup.string(),
    inStock: yup.number(),
});

const deleteProductSchema = yup.object({
    id: yup.string().required("id is required."),
});

export {
    getAllProductsSchema,
    createProductSchema,
    getProductByIdSchema,
    updateProductSchema,
    deleteProductSchema,
}