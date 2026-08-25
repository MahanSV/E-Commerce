import prisma from "#context/dbContext/prisma/client.ts";
import { BaseRepository } from "#repositories/BaseRepository.ts";
import BulkUploadItem from "#domain/models/BulkUploadItem.ts";
import {BulkUploadItemRepositoryInterface} from "#domain/interfaces/BulkUploadItemRepository.ts";

export default class BulkUploadItemRepository extends BaseRepository<BulkUploadItem> implements BulkUploadItemRepositoryInterface {
    constructor() {
        super(BulkUploadItem.createFromSnapshot);
    };

    async findBulkUploadItemByBatchId(batchId: string): Promise<BulkUploadItem[]> {
        const dataModels = await prisma.bulkUploadItem.findMany({
            where: {
                batchId
            }
        });

        return dataModels.map(data => BulkUploadItem.createFromSnapshot(data));
    };
}