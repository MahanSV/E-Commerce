import {SimpleUserDTO, UserDTO} from "#application/dto/UserDTO.ts";
import User from "#domain/models/User.ts";
import {OrderMapper} from "#application/mappers/OrderMapper.ts";
import {NotificationMapper} from "#application/mappers/NotificationMapper.ts";
import {WishlistMapper} from "#application/mappers/WishlistMapper.ts";
import {BulkUploadBatchMapper} from "#application/mappers/BulkUploadBatchMapper.ts";


export class UserMapper {
        /**
        * Maps a domain entity to a DTO
        */
        public static toDTO(entity: User): UserDTO {
                return {
                        id: entity.id,
                        name: entity.name,
                        lastName: entity.lastName,
                        email: entity.email,
                        role: entity.role,
                        mobile: entity.mobile,
                        status: entity.status,
                        createdAt: entity.createdAt,
                        updatedAt: entity.updatedAt,
                        orders: entity.orders ? OrderMapper.toCustomerOrderDTOList(entity.orders) : undefined,
                        notifications: entity.notifications ? NotificationMapper.toDTOList(entity.notifications) : undefined,
                        wishlists: entity.wishlists ? WishlistMapper.toDTOList(entity.wishlists) : undefined,
                        bulkUploadBatches: entity.bulkUploadBatches ? BulkUploadBatchMapper.toDTOList(entity.bulkUploadBatches) : undefined,
                };
        };
        /**
         * it's for simple users DTO
         */
        public static toSimpleUserDTO(entity: User): SimpleUserDTO {
                return {
                        id: entity.id,
                        email: entity.email,
                        role: entity.role,
                };
        };
        /**
         * Maps a list of domain entities to DTOs
         */
        public static toDTOList(entities: User[]): UserDTO[] {
                return entities.map(entity => this.toDTO(entity));
        };
        /**
         * it's for simple users DTOs
         */
        public static toSimpleUserDTOList(entities: User[]): SimpleUserDTO[] {
                return entities.map(entity => this.toSimpleUserDTO(entity));
        };
}



