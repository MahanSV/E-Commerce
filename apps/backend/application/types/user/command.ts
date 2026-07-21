export type AddUserCommand = {
    firstName: string;
    lastName: string;
    nationalId: string;
    mobile: string;
    gender: string;
};

export type UserLogoutCommand = {
    token: string;
    [key: string]: any;
};
