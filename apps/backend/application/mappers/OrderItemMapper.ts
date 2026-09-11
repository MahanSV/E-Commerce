import {
    CreateOrderProductDTO,
    OrderGroupedDTO,
    OrderItemDTO,
    OrderProductDTO,
    OrderProductSummaryDTO,
} from "#application/dto/OrderItemDTO.ts";
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
            customerOrder: OrderMapper.toCustomerOrderDTO(entity.order!),
            price: entity.price,
            products: ProductMapper.toDTO(entity.product!),
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toOrderItemDTOList(entities: OrderItem[]): OrderItemDTO[] {
        return entities.map(entity => this.toOrderItemDTO(entity));
    };

    /**
     * Maps a single entity to POST-create response shape (doc)
     */
    public static toCreateOrderProductDTO(entity: OrderItem): CreateOrderProductDTO {
        return {
            id: entity.id,
            customerOrderId: entity.orderId,
            productId: entity.productId,
            quantity: entity.quantity,
        };
    };

    /**
     * Maps a single entity to GET /:id line-item shape (doc)
     */
    public static toOrderProductDTO(entity: OrderItem): OrderProductDTO {
        return {
            id: entity.id,
            customerOrderId: entity.orderId,
            productId: entity.productId,
            quantity: entity.quantity,
            product: ProductMapper.toDTO(entity.product!),
        };
    };

    /**
     * Maps a list of entities to GET /:id line-item list (doc)
     */
    public static toOrderProductDTOList(entities: OrderItem[]): OrderProductDTO[] {
        return entities.map(entity => this.toOrderProductDTO(entity));
    };

    /**
     * Maps a list of entities to grouped-by-order response (doc)
     */
    public static toGroupedDTOList(entities: OrderItem[]): OrderGroupedDTO[] {
        const grouped = new Map<string, OrderGroupedDTO>();

        for (const entity of entities) {
            const key = entity.orderId;

            if (!grouped.has(key)) {
                grouped.set(key, {
                    customerOrderId: key,
                    customerOrder: OrderMapper.toCustomerOrderDTO(entity.order!),
                    products: [],
                });
            }

            const products = grouped.get(key)!.products;
            const summary: OrderProductSummaryDTO = {
                id: entity.product!.id,
                title: entity.product!.title,
                mainImage: entity.product!.mainImage,
                price: entity.product!.price,
                slug: entity.product!.slug,
                quantity: entity.quantity,
            };

            products.push(summary);
        }

        return Array.from(grouped.values());
    };
}