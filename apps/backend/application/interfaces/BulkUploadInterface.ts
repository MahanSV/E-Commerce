
export interface BulkUploadServiceInterface {
    uploadCsvAndCreateBatch(csvFile: Express.Multer.File): Promise<any>
    listBatches(): Promise<any>
    getBatchDetail(batchId: string): Promise<any>
    updateBatchItems(batchId: string, items: string): Promise<any>
    deleteBatch(batchId: string, deleteProducts: boolean): Promise<any>
}