import {CustomerOrderDTO} from "#application/dto/CustomerOrderDTO.ts";
import Order from "#domain/models/Order.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";


export class OrderMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toCustomerOrderDTO(entity: Order): CustomerOrderDTO {
        return {
            id: entity.id,
            name: entity.user?.name ?? '',
            lastname: entity.user?.lastName ?? '',
            phone: entity.user?.mobile ?? '',
            email: entity.user?.email ?? '',
            company: entity.companyName || "",
            adress: entity.address || "",
            apartment: entity.apartment || "",
            postalCode: entity.postalCode || "",
            dateTime: entity.createdAt,
            status: entity.status,
            city: entity.city || "",
            country: entity.country || "",
            orderNotice: entity.description || "",
            total: entity.total,
            // total: String(entity.orderItems?.reduce((sum, item) => sum + item.quantity, 0)) ?? "0",
            products: entity.orderItems?.map(item => ProductMapper.toDTO(item.product!)),
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toCustomerOrderDTOList(entities: Order[]): CustomerOrderDTO[] {
        return entities.map(entity => this.toCustomerOrderDTO(entity));
    };
}