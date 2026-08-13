import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import UserRepository from '#repositories/UserRepository.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import type {UserServiceInterface} from '#application/interfaces/UserServiceInterface.ts';
import {UserMapper} from "#application/mappers/UserMapper.ts";
import {UserDTO} from "#application/dto/UserDTO.ts";
import {createUserCommand, updateUserCommand} from "#application/types/user/command.ts";
import {UserFactory} from "#domain/factories/UserFactory.ts";

export default class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface = new UserRepository()) {
        this.userRepository = userRepository;
    };

    async getAllUsers() {
        const allUsers = await this.userRepository.getAllUsers();

        return UserMapper.toDTOList(allUsers);
    };

    async createUser(command: createUserCommand): Promise<UserDTO> {
        const userExistEmail = await this.userRepository.getUserByEmail(command.email);

        if (userExistEmail) throw new ApiError(httpStatus.CONFLICT, "Email already exist.", "Error");

        const entity = UserFactory.create(command.email, command.password, command.role);

        const createUser = await this.userRepository.createUser(entity);

        if (!createUser) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create user.", "Error");

        return UserMapper.toDTO(createUser);
    };

    async getUser(id: string): Promise<UserDTO> {
        const user = await this.userRepository.getUser(id);

        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user.", "Error");

        return UserMapper.toDTO(user);
    };

    async updateUser(command: updateUserCommand): Promise<UserDTO> {
        const checkUserExist = await this.userRepository.getUser(command.id);

        if (!checkUserExist) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist", "Error");

        const updatedUser = await this.userRepository.updateUser(command);

        return UserMapper.toDTO(updatedUser);
    };

    async deleteUser(id: string): Promise<UserDTO> {
        const checkUserExist = await this.userRepository.getUser(id);

        if (!checkUserExist) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist", "Error");

        const deleteUser = await this.userRepository.deleteUser(id);

        return UserMapper.toDTO(deleteUser);
    };

    async getUserByEmail(email: string): Promise<UserDTO | null> {
        const user = await this.userRepository.getUserByEmail(email);

        if (!user) return null;

        return UserMapper.toDTO(user);
    };
};