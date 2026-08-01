import User from "#models/User.ts";
import {updateUserCommand} from "#application/types/user/command.js";

export interface UserRepositoryInterface {
    getAllUsers(): Promise<User[]>;
    createUser(user: User): Promise<User>;
    getUser(id: string): Promise<User | null>;
    updateUser(command: updateUserCommand): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    deleteUser(id: string): Promise<User>;
}
