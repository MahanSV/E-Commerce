import prisma from '#context/dbContext/prisma/client.ts';
import User from '#models/User.ts';
import type { UserRepositoryInterface } from '#domain/interfaces/UserRepository.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {updateUserCommand} from "#application/types/user/command.ts";

export default class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
  constructor() {
    super(User.createFromSnapshot);
  };

  async getAllUsers() {
    const dataModel = await prisma.user.findMany();

    return dataModel.map(data => User.createFromSnapshot(data));
  };

  async getUser(id: string): Promise<User | null> {
    const dataModel = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async getUserByEmail(email: string): Promise<User | null> {
    const dataModel = await prisma.user.findFirst({
      where: {
        email
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };
  
  async createUser(user: User): Promise<User> {
    const dataModel = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
        mobile: user.mobile,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async updateUser(command: updateUserCommand): Promise<User> {
    const dataModel = await prisma.user.update({
      where: {
        id: command.id,
      },
      data: {
        id: command.id,
        email: command.email,
        password: command.password,
        role: command.role,
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };

  async deleteUser(id: string): Promise<User> {
    const dataModel = await prisma.user.delete({
      where: {
        id
      }
    });

    return dataModel && User.createFromSnapshot(dataModel);
  };
}
