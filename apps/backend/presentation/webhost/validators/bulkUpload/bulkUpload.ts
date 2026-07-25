import yup from 'yup';


const uploadCsvAndCreateBatchSchema = yup.object({
    files: yup.mixed().required("files is required."),
});

const getBatchDetailSchema = yup.object({
    batchId: yup.string().required("batchId is required."),
});

const updateBatchItemsSchema = yup.object({
    batchId: yup.string().required("batchId is required."),
    items: yup.string().required("items is required."),
});

const deleteBatchSchema = yup.object({
    batchId: yup.string().required("batchId is required."),
    deleteProducts: yup.string().required("deleteProducts is required."),
});

export {
    uploadCsvAndCreateBatchSchema,
    getBatchDetailSchema,
    updateBatchItemsSchema,
    deleteBatchSchema,
}