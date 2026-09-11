import yup from 'yup';

const getProductBySlugSchema = yup.object({
    slug: yup.string().required("slug is required."),
});

export {
    getProductBySlugSchema,
}