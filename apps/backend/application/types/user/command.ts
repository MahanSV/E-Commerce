import {UserType} from "#domain/enums/userType.ts";

export type createUserCommand = {
    email: string;
    password: string;
    role: UserType;
};

export type updateUserCommand = {
    id: string;
    email: string;
    password: string;
    role: UserType;
};

export type createCustomerCommand = {
    name: string;
    lastName: string;
    email: string;
    mobile: string;
};