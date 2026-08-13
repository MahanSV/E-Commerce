import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {MerchantRepositoryInterface} from "#domain/interfaces/MerchantRepository.ts";
import Merchant from "#models/Merchant.ts";
import {updateMerchantCommand} from "#application/types/merchant/command.ts";

export default class MerchantRepository extends BaseRepository<Merchant> implements MerchantRepositoryInterface {
    constructor() {
        super(Merchant.createFromSnapshot);
    };

    async getAllMerchants(): Promise<Merchant[]> {
        const dataModel = await prisma.merchant.findMany({
            include: {
                merchantProducts: {
                    include: {
                        product: {
                            include: {
                                category: true
                            }
                        }
                    },
                },
            },
        });

        return dataModel.map(data => Merchant.createFromSnapshot(data));
    };

    async getMerchantById(id: string): Promise<Merchant> {
        const dataModel = await prisma.merchant.findUnique({
            where: {
                id
            },
            include: {
                merchantProducts: {
                    include: {
                        product: {
                            include: {
                                category: true
                            }
                        }
                    },
                },
            },
        });

        return dataModel && Merchant.createFromSnapshot(dataModel);
    };

    async createMerchant(entity: Merchant): Promise<Merchant> {
        const dataModel = await prisma.merchant.create({
            data: {
                id: entity.id,
                name: entity.name,
                description: entity.description,
                email: entity.email,
                mobile: entity.mobile,
                address: entity.address,
                status: entity.status,
                password: entity.password,
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
            }
        });

        return dataModel && Merchant.createFromSnapshot(dataModel);
    };

    async updateMerchant(command: updateMerchantCommand): Promise<Merchant> {
        const dataModel = await prisma.merchant.update({
            where: {
                id: command.id,
            },
            data: {
                id: command.id,
                name: command.name,
                email: command.email,
                mobile: command.phone,
                address: command.address,
                description: command.description,
                status: command.status,
            }
        });

        return dataModel && Merchant.createFromSnapshot(dataModel);
    };

    async deleteMerchant(id: string): Promise<Merchant> {
        const dataModel = await prisma.merchant.delete({
            where: { id }
        });

        return dataModel && Merchant.createFromSnapshot(dataModel);
    };
};