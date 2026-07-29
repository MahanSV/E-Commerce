import type { AddUserCommand, UserLogoutCommand } from '#application/types/user/command.ts';

export interface UserServiceInterface {
    login(receivedToken: string | null): Promise<any>;
    userLogout(command: UserLogoutCommand): Promise<any>;
    getUserById(userId: string): Promise<any>;
    getUsers(): Promise<any>;
    getUserByNationalId(nationalId: string | null): Promise<any>;
    addUser(command: AddUserCommand): Promise<any>;
}
