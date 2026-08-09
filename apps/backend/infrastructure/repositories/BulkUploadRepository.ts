import { BulkUploadRepositoryInterface } from "#domain/interfaces/BulkUploadRepository.ts";
import {BaseRepository} from "#repositories/BaseRepository.ts";

export default class BulkUploadRepository /*extends BaseRepository<BulkUpload> implements BulkUploadRepositoryInterface*/ {
    /*constructor() {
      super(BulkUpload.createFromSnapshot);
    };*/

    async uploadCsvAndCreateBatch(csvFile: any): Promise<any> {};

    async listBatches(): Promise<any> {};

    async getBatchDetail(batchId: string): Promise<any> {};

    async updateBatchItems(batchId: string, items: string): Promise<any> {};

    async deleteBatch(batchId: string, deleteProducts: boolean): Promise<any> {};
}
