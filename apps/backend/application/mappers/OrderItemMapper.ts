import {OrderItemDTO} from "#application/dto/OrderItemDTO.ts";
import OrderItem from "#domain/models/OrderItem.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";
import {OrderMapper} from "#application/mappers/OrderMapper.ts";


export class OrderItemMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toOrderItemDTO(entity: OrderItem): OrderItemDTO {
        return {
            id: entity.id,
            quantity: entity.quantity,
            order: OrderMapper.toCustomerOrderDTO(entity.order),
            price: entity.price,
            products: ProductMapper.toDTO(entity.product),
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toOrderItemDTOList(entities: OrderItem[]): OrderItemDTO[] {
        return entities.map(entity => this.toOrderItemDTO(entity));
    };
}