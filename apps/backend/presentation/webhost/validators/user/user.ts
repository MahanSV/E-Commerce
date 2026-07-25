import yup from 'yup';

const createUserSchema = yup.object({
    email: yup.string().required("email is required."),
    password: yup.string().required("password is required."),
    role: yup.string().required("role is required."),
});

const getUserSchema = yup.object({
    id: yup.string().required("id is required."),
});

const updateUserSchema = yup.object({
    id: yup.string().required("id is required."),
    email: yup.string().required("email is required."),
    password: yup.string().required("password is required."),
    role: yup.string().required("role is required."),
});

const deleteUserSchema = yup.object({
    id: yup.string().required("id is required."),
});

const getUserByEmailSchema = yup.object({
    email: yup.string().required("email is required."),
});

export {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getUserByEmailSchema,
}