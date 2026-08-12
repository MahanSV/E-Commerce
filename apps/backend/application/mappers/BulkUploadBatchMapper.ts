import BulkUploadBatch from "#domain/models/BulkUploadBatch.ts";
import { BulkUploadBatchDTO } from "#application/dto/BulkUploadBatchDTO.ts";
import {UserMapper} from "#application/mappers/UserMapper.ts";
import {BulkUploadItemMapper} from "#application/mappers/BulkUploadItemMapper.ts";


export class BulkUploadBatchMapper {
        /**
         * Maps a domain entity to a DTO
         */
        public static toDTO(entity: BulkUploadBatch): BulkUploadBatchDTO {
                return {
                        id: entity.id,
                        fileName: entity.fileName,
                        createdAt: entity.createdAt,
                        status: entity.status,
                        itemCount: entity.itemCount,
                        errorCount: entity.errorCount,
                        userId: entity.userId,
                        items: entity.items ? BulkUploadItemMapper.toDTOList(entity.items) : [],
                        user: entity.user ? UserMapper.toDTO(entity.user) : undefined,
                };
        };
        /**
         * Maps a list of domain entities to DTOs
         */
        public static toDTOList(entities: BulkUploadBatch[]): BulkUploadBatchDTO[] {
                return entities.map(entity => this.toDTO(entity));
        };
}