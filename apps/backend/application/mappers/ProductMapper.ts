import Product from "#domain/models/Product.ts";
import {ProductDTO} from "#application/dto/ProductDTO.ts";

export class ProductMapper {
        /**
         * Maps a domain entity to a DTO
         */
        public static toDTO(entity: Product): ProductDTO {
                return {
                        id: entity.id,
                        categoryId: entity.categoryId,
                        title: entity.title,
                        slug: entity.slug,
                        manufacturer: entity.manufacturer,
                        photo: entity.photo,
                        inStock: entity.inStock,
                        price: entity.price,
                        rating: entity.rating,
                        quantity: entity.quantity,
                        SKU: entity.SKU,
                        socialLink: entity.socialLink,
                        description: entity.description,
                        information: entity.information,
                        category: CategoryDTO,
                        /*merchantProducts?: [],
                        orderItems?: [],*/
                };
        };
        /**
         * Maps a list of domain entities to DTOs
         */
        public static toDTOList(entities: Product[]): ProductDTO[] {
                return entities.map(entity => this.toDTO(entity));
        };
}