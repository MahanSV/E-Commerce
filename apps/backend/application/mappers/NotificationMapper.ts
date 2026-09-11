import { NotificationDTO } from "#application/dto/NotificationDTO.ts";
import Notification from "#models/Notification.ts";
import {UserMapper} from "#application/mappers/UserMapper.ts";


export class NotificationMapper {
    /**
     * Maps a domain entity to a DTO
     */
    public static toDTO(entity: Notification): NotificationDTO {
        return {
            id: entity.id,
            userId: entity.userId,
            title: entity.title,
            message: entity.description,
            isRead: entity.isRead,
            priority: entity.priority,
            type: entity.type,
            metadata: entity.metadata,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            user: entity.user ? UserMapper.toDTO(entity.user) : undefined
        };
    };
    /**
     * Maps a list of domain entities to DTOs
     */
    public static toDTOList(entities: Notification[]): NotificationDTO[] {
        return entities.map(entity => this.toDTO(entity));
    };
}