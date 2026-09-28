import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import UserRepository from '#repositories/UserRepository.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import type {UserServiceInterface} from '#application/interfaces/UserServiceInterface.ts';
import {UserMapper} from "#application/mappers/UserMapper.ts";
import {SimpleUserDTO, UserDTO, UserLoginDTO} from "#application/dto/UserDTO.ts";
import {createUserCommand, loginUserCommand, updateUserCommand} from "#application/types/user/command.ts";
import {UserFactory} from "#domain/factories/UserFactory.ts";
import bcrypt from "bcryptjs";
import {tokenKeyStructure} from "#context/dbContext/redis/redisStrcuture/userStructures.ts";
import RedisDataModel from "#context/dbContext/redis/dataModel/redisDataModel.ts";
import {redisSet} from "#context/dbContext/redis/redis.ts";
import {generateJWSToken} from "#application/services/TokenService.ts";
import {add} from "date-fns";
import env from "#substructure/env.ts";

export default class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface = new UserRepository()) {
        this.userRepository = userRepository;
    };

    async getAllUsers(): Promise<SimpleUserDTO[]>  {
        const allUsers = await this.userRepository.getAllUsers();

        return UserMapper.toSimpleUserDTOList(allUsers);
    };

    async createUser(command: createUserCommand): Promise<SimpleUserDTO> {
        const userExistEmail = await this.userRepository.getUserByEmail(command.email);

        if (userExistEmail) throw new ApiError(httpStatus.CONFLICT, "Email already exist.", "Error");

        const entity = await UserFactory.create(command.email, command.password, command.role);

        const createUser = await this.userRepository.createUser(entity);

        if (!createUser) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create user.", "Error");

        return UserMapper.toSimpleUserDTO(createUser);
    };

    async getUser(id: string): Promise<SimpleUserDTO> {
        const user = await this.userRepository.getUser(id);

        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user.", "Error");

        return UserMapper.toSimpleUserDTO(user);
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

        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist", "Error");

        return UserMapper.toDTO(user);
    };

    async loginUser(command: loginUserCommand): Promise<UserLoginDTO> {
        const user = await this.userRepository.getUserByEmail(command.email);

        if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Email or password is incorrect", "Error");

        const isPasswordCorrect = await bcrypt.compare(
              command.password,
              user.password
        );

        if (!isPasswordCorrect)
            throw new ApiError(httpStatus.NOT_FOUND, "Email or password is incorrect", "Error");

        const token = await generateJWSToken({
            id: user.id,
            email: user.email,
            role: user.role,
            tokenCreatedAt: new Date(),
            tokenExpireAt: add(new Date(), { seconds: env.tokenExpirationTime }),
        });

        const loginDTO = UserMapper.toLoginUserDTO(user, token);

        const tokenDataModel = RedisDataModel.create(loginDTO.token, tokenKeyStructure(user.email));
        await redisSet(tokenDataModel);

        return loginDTO;
    };
};