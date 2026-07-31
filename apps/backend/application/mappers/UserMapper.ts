import {UserDTO} from "#application/dto/UserDTO.ts";
import User from "#domain/models/User.ts";


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
                        // password: entity.password,
                        role: entity.role,
                        mobile: entity.mobile,
                        status: entity.status,
                        createdAt: entity.createdAt,
                        updatedAt: entity.updatedAt,
                };
        };
        /**
         * Maps a list of domain entities to DTOs
         */
        public static toDTOList(entities: User[]): UserDTO[] {
                return entities.map(entity => this.toDTO(entity));
        };
}



