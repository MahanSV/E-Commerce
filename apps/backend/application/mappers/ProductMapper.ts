import Product from "#domain/models/Product.ts";
import {ProductDTO, ProductImageDTO} from "#application/dto/ProductDTO.ts";
import {CategoryMapper} from "#application/mappers/CategoryMapper.ts";
import {OrderItemMapper} from "#application/mappers/OrderItemMapper.ts";
import {BulkUploadItemMapper} from "#application/mappers/BulkUploadItemMapper.ts";
import {WishlistMapper} from "#application/mappers/WishlistMapper.ts";
import {MerchantProductMapper} from "#application/mappers/MerchantProductMapper.ts";

export class ProductMapper {
        /**
         * Maps a domain entity to a DTO
         */
        public static toDTO(entity: Product): ProductDTO {
                return {
                    id: entity.id,
                    slug: entity.slug,
                    title: entity.title,
                    mainImage: entity.mainImage,
                    price: entity.price,
                    rating: entity.rating,
                    description: entity.description ?? undefined,
                    manufacturer: entity.manufacturer,
                    inStock: entity.inStock,
                    photo: entity.photo,
                    merchantId: entity.merchantProducts?.map(mp => mp.merchantId)[0],
                    categoryId: entity.categoryId,
                    quantity: entity.quantity,
                    SKU: entity.SKU ?? undefined,
                    socialLink: entity.socialLink ?? undefined,
                    information: entity.information ?? undefined,
                    wishlists: entity.wishlists ? WishlistMapper.toDTOList(entity.wishlists) : [],
                    merchantProducts: entity.merchantProducts ? MerchantProductMapper.toDTOList(entity.merchantProducts) : [],
                    category: entity.category ? CategoryMapper.toDTO(entity.category) : undefined,
                    orderItems: entity.orderItems ? OrderItemMapper.toOrderItemDTOList(entity.orderItems) : [],
                    bulkUploadItems: entity.bulkUploadItems ? BulkUploadItemMapper.toDTOList(entity.bulkUploadItems) : [],
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