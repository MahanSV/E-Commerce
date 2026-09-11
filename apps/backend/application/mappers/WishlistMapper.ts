import { WishlistDTO } from "#application/dto/WishListDTO.ts";
import WishList from "#models/WishList.ts";
import {UserMapper} from "#application/mappers/UserMapper.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";


export class WishlistMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toDTO(entity: WishList): WishlistDTO {
        return {
            id: entity.id,
            productId: entity.productId,
            userId: entity.userId,
            user: entity.user ? UserMapper.toDTO(entity.user) : undefined,
            product: entity.product ? ProductMapper.toDTO(entity.product) : undefined,
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toDTOList(entities: WishList[]): WishlistDTO[] {
        return entities.map(entity => this.toDTO(entity));
    };
}