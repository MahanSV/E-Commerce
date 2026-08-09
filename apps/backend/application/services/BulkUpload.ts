import { BulkUploadServiceInterface } from "#application/interfaces/BulkUploadInterface.ts";
import { BulkUploadRepositoryInterface } from "#domain/interfaces/BulkUploadRepository.ts";
import BulkUploadRepository from "#repositories/BulkUploadRepository.ts";


export default class BulkUploadService implements BulkUploadServiceInterface {
    private bulkUploadRepository: BulkUploadRepositoryInterface;

    constructor(bulkUploadRepository: BulkUploadRepositoryInterface = new BulkUploadRepository()) {
        this.bulkUploadRepository = bulkUploadRepository;
    };

    async uploadCsvAndCreateBatch(csvFile: any): Promise<any> {};
    async listBatches(): Promise<any> {};
    async getBatchDetail(batchId: string): Promise<any> {};
    async updateBatchItems(batchId: string, items: string): Promise<any> {};
    async deleteBatch(batchId: string, deleteProducts: boolean): Promise<any> {};
};