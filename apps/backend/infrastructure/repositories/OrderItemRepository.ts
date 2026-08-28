import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {OrderItemRepositoryInterface} from "#domain/interfaces/OrderItemRepository.ts";
import OrderItem from "#models/OrderItem.ts";
import {updateOrderItemCommand} from "#application/types/orderItem/command.ts";


export default class OrderItemRepository extends BaseRepository<OrderItem> implements OrderItemRepositoryInterface {
    constructor() {
        super(OrderItem.createFromSnapshot);
    };

    async getOrderProductById(id: string): Promise<OrderItem | null> {
        const dataModel = await prisma.orderItem.findUnique({
            where: {
                id
            },
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
                product: {
                    include: {
                        category: true,
                    },
                },
            }
        });

        return dataModel && OrderItem.createFromSnapshot(dataModel);
    }

    async createOrderProduct(entity: OrderItem): Promise<OrderItem> {
        const dataModel = await prisma.orderItem.create({
            data: {
                id: entity.id,
                orderId: entity.orderId,
                productId: entity.productId,
                quantity: entity.quantity,
                price: entity.price,
            },
            include: {
                order: true,
                product: {
                    include: {
                        category: true,
                    },
                },
            }
        });

        return dataModel && OrderItem.createFromSnapshot(dataModel);
    };

    async updateProductOrder(command: updateOrderItemCommand): Promise<OrderItem> {
        const dataModel = await prisma.orderItem.update({
            where: {
                id: command.id,
            },
            data: {
                orderId: command.orderId,
                productId: command.productId,
                quantity: command.quantity,
            },
            include: {
                order: true,
                product: {
                    include: {
                        category: true,
                    },
                },
            }
        });

        return dataModel && OrderItem.createFromSnapshot(dataModel);
    };

    async deleteProductOrder(id: string): Promise<void> {
        await prisma.orderItem.deleteMany({
            where: {
                orderId: id
            },
        });
    }

    async getProductOrder(id: string): Promise<OrderItem[]> {
        const dataModels = await prisma.orderItem.findMany({
            where: {
                orderId: id
            },
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
                product: {
                    include: {
                        category: true,
                    },
                },
            }
        });

        return dataModels.map(data => OrderItem.createFromSnapshot(data));
    };

    async getAllProductOrders(): Promise<OrderItem[]> {
        const dataModels = await prisma.orderItem.findMany({
            include: {
                order: {
                    include: {
                        user: true,
                    },
                },
                product: true,
            }
        });

        return dataModels.map(data => OrderItem.createFromSnapshot(data));
    };

    async findAllByProductIds(productIds: string[]): Promise<OrderItem[]> {
        const dataModels = await prisma.orderItem.findMany({
            where: { productId: { in: productIds } },
            select: { productId: true },
        });

        return dataModels.map(data => OrderItem.createFromSnapshot(data));
    };
};