import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import UserRepository from '#repositories/UserRepository.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import User from '#models/userModel/user.ts';
import env from '#substructure/env.ts';
import UserTokenDto from '#application/services/userServices/userTokenDto.ts';
import { add } from 'date-fns';
import { generateJWSToken } from '#application/services/userServices/token.service.ts';
import RedisDataModel from '#context/dbContext/redis/dataModel/redisDataModel.ts';
import { redisDel, redisSet } from '#context/dbContext/redis/redis.ts';
import { tokenKeyStructure } from '#context/dbContext/redis/redisStrcuture/userStructures.ts';
import axios from 'axios';
import type {UserServiceInterface} from '#application/interfaces/userServiceInterface.ts';
import type { AddUserCommand, UserLogoutCommand } from '#application/types/user/command.ts';
import {getUserByIdDTO, UserDTO, UserLoginDTO} from "#application/dto/UserDTO.js";

export default class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface = new UserRepository()) {
        this.userRepository = userRepository;
    };

    async login(receivedToken: string | null): Promise<UserLoginDTO> {
        let user;
        let userData;

        const data = {
            ServiceID: 583858,
            ServiceUsername: 'mdjvEVV47hnFReVY',
            ServicePassword: 'qzXAHner44yTzBBb',
        };

        const headers = {
            Authorization: receivedToken,
            'Content-Type': 'application/json',
        }


        if(env.environment==='production'){

            if (!receivedToken)
                throw new ApiError(httpStatus.UNAUTHORIZED, 'توکن دریافت نشد.', 'Error');

            try {
                const url = env.foreignApi;

                const responseSso = await axios.post(
                    url,
                    data,
                    { headers }
                );

                userData = responseSso.data[0];


            } catch (error: any) {
                throw new ApiError(error.response.status || httpStatus.BAD_REQUEST, error.response.statusText || 'مشکلی در واکشی اطلاعات رخ داده است', 'Error');
            }

        }else{

            const url = env.mockPath;

            const responseSso = await axios.post(
                url,
                data,
                { headers }
            );

            userData = responseSso.data[0];
        }

        userData = {
            nationalId: userData.NationalID,
            mobile: userData.Mobile,
            firstName: userData.FName,
            lastName: userData.LName,
            gender: userData.Gender === 0 ? 'MALE' : 'FEMALE',
            type: "User",
        };

        const existingUser = await this.userRepository.checkUserExistenceByNationalId(userData.nationalId);

        if (existingUser) {

            user = existingUser;

        } else {

            const newUser = User.create(userData);

            user = await this.userRepository.createUser(newUser);

            try {
                const data ={
                    id:user.id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    nationalId:user.nationalId,
                }
                await axios.post(`${env.reportPath}report/user`,
                    {...data},
                    {
                        timeout: 5000,
                        headers: {
                            'x-api-token': env.toolAccessToken,
                            'Content-Type': 'application/json',
                        }
                    }
                )
            } catch (error: any) {

                throw new Error("ارتباط بین سرویس ها انجام نشد.");
            }
        }

        const now = new Date();

        const userTokenDto = new UserTokenDto(
            user.id,
            user.nationalId,
            user.type,
            now,
            add(now, { seconds: env.tokenExpirationTime }),
        );

        const token = await generateJWSToken(userTokenDto.export());

        const tokenDataModel = RedisDataModel.create(token, tokenKeyStructure(user._nationalId));
        await redisSet(tokenDataModel);

        return {
            token: token,
            userInfo: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
            },
        };
    };


    async userLogout(command: UserLogoutCommand): Promise<string> {
        const tokenDataModel = RedisDataModel.create(command.token, tokenKeyStructure(command.nationalId));
        await redisDel(tokenDataModel);

        return command.id;
    };

    async getUserById(userId: string): Promise<getUserByIdDTO> {
        const user = await this.userRepository.getUserById(userId);

        if (!user)
            throw new ApiError(httpStatus.BAD_REQUEST,'کاربر مورد نظر یافت نشد.', 'Error');

        return {
            id: user.id,
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            nationalId: user.nationalId,
            type: user.type,
            mobile: user?.mobile,
            gender: user?.gender
        };
    };

    async getUsers(): Promise<UserDTO[]> {
        let users=  await this.userRepository.getUsers();

        users = users.map((user: any) => ({
            id: user.id,
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            nationalId: user.nationalId,
            type: user.type,
            mobile: user?.mobile,
            gender: user?.gender,
            createdAt: user.createdAt
        }));

        return users;
    };

    async getUserByNationalId(nationalId: string): Promise<UserDTO> {
        const user = await this.userRepository.getUserByNationalId(nationalId);

        if (!user)
            throw new ApiError(httpStatus.BAD_REQUEST,'کاربر مورد نظر یافت نشد.', 'Error');

        return user;
    };

    async addUser(command: AddUserCommand): Promise<UserDTO> {
        const user = await this.userRepository.getUserByNationalId(command.nationalId);

        if (user)
            throw new ApiError(httpStatus.BAD_REQUEST,'کاربر مورد نظر وجود دارد.', 'Error');

        const newUser = User.create({...command,type:'User'})

        return await this.userRepository.createUser(newUser);
    };
};
