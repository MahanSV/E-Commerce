import { BulkUploadItemDTO } from "#application/dto/BulkUploadItemDTO.ts";
import BulkUploadItem from "#domain/models/BulkUploadItem.ts";
import {BulkUploadBatchMapper} from "#application/mappers/BulkUploadBatchMapper.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";



export class BulkUploadItemMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toDTO(entity: BulkUploadItem): BulkUploadItemDTO {
        return {
            id: entity.id,
            batchId: entity.batchId,
            productId: entity.productId,
            title: entity.title,
            slug: entity.slug,
            price: entity.price,
            manufacturer: entity.manufacturer,
            description: entity.description,
            mainImage: entity.mainImage,
            categoryId: entity.categoryId,
            inStock: entity.inStock,
            status: entity.status,
            error: entity.error,
            batch: BulkUploadBatchMapper.toDTO(entity.batch),
            product: entity.product ? ProductMapper.toDTO(entity.product) : undefined,
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toDTOList(entities: BulkUploadItem[]): BulkUploadItemDTO[] {
        return entities.map(entity => this.toDTO(entity));
    };
}