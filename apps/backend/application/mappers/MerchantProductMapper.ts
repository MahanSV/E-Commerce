import { MerchantProductDTO } from "#application/dto/MerchantProductDTO.ts";
import MerchantProduct from "#domain/models/MerchantProduct.ts";
import {MerchantMapper} from "#application/mappers/MerchantMapper.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";



export class MerchantProductMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toDTO(entity: MerchantProduct): MerchantProductDTO {
        return {
            id: entity.id,
            merchantId: entity.merchantId,
            productId: entity.productId,
            merchant: entity.merchant ? MerchantMapper.toDTO(entity.merchant) : undefined,
            product: entity.product ? ProductMapper.toDTO(entity.product) : undefined,
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toDTOList(entities: MerchantProduct[]): MerchantProductDTO[] {
        return entities.map(entity => this.toDTO(entity));
    };
}