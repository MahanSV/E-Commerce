import {UserType} from "#domain/enums/userType.ts";
import {NotificationDTO} from "#application/dto/NotificationDTO.ts";
import {CustomerOrderDTO} from "#application/dto/CustomerOrderDTO.ts";


export interface UserDTO {
    id: string;
    name: string;
    lastName: string;
    email: string;
    // password: string;
    role: UserType;
    mobile: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    orders?: CustomerOrderDTO[];
    notifications?: NotificationDTO[];
    wishlists?: WishListDTO[];
}