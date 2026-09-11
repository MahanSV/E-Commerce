import yup from 'yup';


const createCategorySchema = yup.object({
    name: yup.string()
});

const getCategorySchema = yup.object({
    id: yup.string()
});

const updateCategorySchema = yup.object({
    id: yup.string(),
    name: yup.string()
});

const deleteCategorySchema = yup.object({
    id: yup.string(),
});

export {
    createCategorySchema,
    getCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
};