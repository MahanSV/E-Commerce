import prisma from '#context/dbContext/prisma/client.ts';
import Order from '#models/Order.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {OrderRepositoryInterface} from "#domain/interfaces/OrderRepository.ts";
import {updateCustomerOrderCommand} from "#application/types/order/command.ts";

export default class OrderRepository extends BaseRepository<Order> implements OrderRepositoryInterface {
    constructor() {
        super(Order.createFromSnapshot);
    };

    async getOrderById(id: string): Promise<Order | null> {
        const dataModel = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                user: true,
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return dataModel && Order.createFromSnapshot(dataModel);
    };

    async checkOrderExist(id: string): Promise<Order | null> {
        const dataModel = await prisma.order.findUnique({
            where: {id},
            include: {
                user: true
            }
        });

        return dataModel && Order.createFromSnapshot(dataModel);
    }

    async createCustomerOrder(entity: Order): Promise<Order> {
        const dataModel = await prisma.order.create({
            data: {
                id: entity.id,
                userId: entity.userId,
                status: entity.status,
                isActive: entity.isActive,
                companyName: entity.companyName,
                address: entity.address,
                apartment: entity.apartment,
                postalCode: entity.postalCode,
                country: entity.country,
                city: entity.city,
                description: entity.description,
                total: entity.total,
                deliversAt: entity.deliversAt,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
            },
            include: {
                user: true
            }
        });

        return dataModel && Order.createFromSnapshot(dataModel);
    };

    async updateCustomerOrder(command: updateCustomerOrderCommand): Promise<Order> {
        const dataModel = await prisma.order.update({
            where: {
                id: command.id,
            },
            data: {
                status: command.status,
                companyName: command.company,
                address: command.address,
                apartment: command.apartment,
                postalCode: command.postalCode,
                country: command.country,
                city: command.city,
                description: command.description,
                total: command.total,
                deliversAt: command.createdAt
            },
            include: {
                user: true
            }
        });

        return dataModel && Order.createFromSnapshot(dataModel);
    };

    async deleteCustomerOrder(id: string): Promise<Order> {
        const dataModel = await prisma.order.delete({
            where: {id},
            include: {
                user: true
            }
        });

        return dataModel && Order.createFromSnapshot(dataModel);
    };

    async getAllOrders(page: number, limit: number, offset: number): Promise<{
        orders: Order[],
        pagination: {
            page: number,
            limit: number
            total: number
            totalPages: number
        }
    }>
    {
        const [dataModels, totalCount] = await Promise.all([
            await prisma.order.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    user: true
                }
            }),
            await prisma.order.count()
        ]);

        const orders = dataModels.map(data => Order.createFromSnapshot(data));

        return {
            orders,
            pagination: {
                page,
                limit,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            }
        }
    };
};