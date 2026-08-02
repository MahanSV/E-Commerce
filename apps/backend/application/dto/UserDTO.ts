import {UserType} from "#domain/enums/userType.js";
import {NotificationDTO} from "#application/dto/NotificationDTO.js";


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
    orders?: OrderDTO[];
    notifications?: NotificationDTO[];
    wishlists?: WishListDTO[];
}