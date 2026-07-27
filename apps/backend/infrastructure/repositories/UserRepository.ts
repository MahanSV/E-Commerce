import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";

export default class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
  constructor() {
    super(User.createFromSnapshot);
  }

  async checkUserExistenceByNationalId(nationalId: string | null): Promise<User | null> {
    if (!nationalId) {
      return null;
    }

    const user = await prisma.user.findFirst({
      where: {
        nationalId
      }
    });

    return user&&User.createFromSnapshot(user);
  };

  async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    return user&&User.createFromSnapshot(user);
  };

  async getUserByNationalId(nationalId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        nationalId,
      }
    });

    return user&&User.createFromSnapshot(user);
  };

  async getUsers(): Promise<User[]> {
    const dataModels = await prisma.user.findMany();
    return dataModels&&dataModels.map((data: any) => User.createFromSnapshot(data));
  };

  async createUser(userModel: User): Promise<User> {
    try {
      return await prisma.user.create({
        data: this.createSchemaFromUserModel(userModel)
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  createSchemaFromUserModel(userModel: User) {
    return {
      id: userModel.id,
      username: userModel.username,
      password: userModel.password,
      firstName: userModel.firstName,
      lastName:userModel.lastName,
      nationalId: userModel.nationalId,
      mobile: userModel.mobile,
      type: userModel.type,
      gender: userModel.gender,
    };
  }
}
