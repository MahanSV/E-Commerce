export interface UserDTO {
    id: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    nationalId: string;
    type: string;
    mobile?: string;
    gender?: string;
    createdAt?: Date;
}

export interface UserLoginDTO {
    token: string;
    userInfo: {
        id: string;
        firstName?: string;
        lastName?: string;
        type: string;
    },
}

export interface getUserByIdDTO {
    id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    nationalId: string;
    type: string;
    mobile?: string;
    gender?: string;
}