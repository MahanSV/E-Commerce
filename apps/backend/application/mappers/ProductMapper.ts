import Product from "#domain/models/Product.ts";
import {ProductDTO, ProductImageDTO} from "#application/dto/ProductDTO.ts";
import {CategoryMapper} from "#application/mappers/CategoryMapper.js";

export class ProductMapper {
        /**
         * Maps a domain entity to a DTO
         */
        public static toDTO(entity: Product): ProductDTO {
                return {

                    id: entity.id,
                    title: entity.title,
                    slug: entity.slug,
                    mainImage: entity.mainImage,
                    manufacturer: entity.manufacturer,
                    photo: entity.photo,
                    inStock: entity.inStock,
                    price: entity.price,
                    rating: entity.rating,
                    quantity: entity.quantity,
                    categoryId: entity.categoryId,
                    merchantId: entity.merchantProducts?.map(item => item.merchantId)[0],
                    SKU: entity.SKU,
                    socialLink: entity.socialLink,
                    description: entity.description,
                    information: entity.information,
                    category: CategoryMapper.toDTO(entity.category),
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


        public static toProductImageDTO(entity: Product): ProductImageDTO[] | undefined {
            return entity?.photo?.map((image) => {
                return {
                    productID: entity.id,
                    imageID: image.imageID,
                    image: image.image,
                }
            });
        };
}