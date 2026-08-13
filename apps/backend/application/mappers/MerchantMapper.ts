import {MerchantDTO} from "#application/dto/MerchantDTO.ts";
import Merchant from "#models/Merchant.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";

export class MerchantMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toDTO(entity: Merchant): MerchantDTO {
        return {
            id: entity.id,
            name: entity.name,
            description: entity?.description,
            email: entity?.email,
            phone: entity?.mobile,
            address: entity?.address,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            products: entity.merchantProducts?.map(mp => ProductMapper.toDTO(mp.product))
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toDTOList(entities: Merchant[]): MerchantDTO[] {
        return entities.map(entity => this.toDTO(entity));
    };
}