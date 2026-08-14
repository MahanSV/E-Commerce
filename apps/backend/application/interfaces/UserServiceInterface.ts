import {SimpleUserDTO, UserDTO} from "#application/dto/UserDTO.ts";
import {createUserCommand, updateUserCommand} from "#application/types/user/command.ts";


export interface UserServiceInterface {
    getAllUsers(): Promise<SimpleUserDTO[]>;
    createUser(command: createUserCommand): Promise<SimpleUserDTO>;
    getUser(id: string): Promise<SimpleUserDTO> ;
    updateUser(command: updateUserCommand): Promise<UserDTO>;
    deleteUser(id: string): Promise<UserDTO>;
    getUserByEmail(email: string): Promise<UserDTO | null>;
}
