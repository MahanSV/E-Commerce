import yup from 'yup';


const searchProductsSchema = yup.object({
    query: yup.mixed().required(),
});

export {
    searchProductsSchema,
}