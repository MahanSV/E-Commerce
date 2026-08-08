import Category from "#domain/models/Category.ts";
import {CategoryDTO} from "#application/dto/CategoryDTO.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";

export class CategoryMapper {
        /**
         * Maps a domain entity to a DTO
         */
        public static toDTO(entity: Category): CategoryDTO {
                return {
                        id: entity.id,
                        name: entity.name,
                        products: entity.products?.length ? ProductMapper.toDTOList(entity.products) : []
                };
        };
        /**
         * Maps a list of domain entities to DTOs
         */
        public static toDTOList(entities: Category[]): CategoryDTO[] {
                return entities.map(entity => this.toDTO(entity));
        };
}