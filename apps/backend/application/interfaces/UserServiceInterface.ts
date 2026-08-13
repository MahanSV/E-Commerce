import {UserDTO} from "#application/dto/UserDTO.ts";
import {createUserCommand, updateUserCommand} from "#application/types/user/command.ts";


export interface UserServiceInterface {
    getAllUsers(): Promise<UserDTO[]>;
    createUser(command: createUserCommand): Promise<UserDTO>;
    getUser(id: string): Promise<UserDTO>;
    updateUser(command: updateUserCommand): Promise<UserDTO>;
    deleteUser(id: string): Promise<UserDTO>;
    getUserByEmail(email: string): Promise<UserDTO | null>;
}
