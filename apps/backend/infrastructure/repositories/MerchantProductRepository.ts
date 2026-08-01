import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import MerchantProduct from "#models/MerchantProduct.ts";
import {MerchantProductRepositoryInterface} from "#domain/interfaces/MerchantProductRepository.ts";
import {MerchantProductCommand} from "#application/types/merchantProduct/command.ts";

export default class MerchantProductRepository extends BaseRepository<MerchantProduct> implements MerchantProductRepositoryInterface {
    constructor() {
        super(MerchantProduct.createFromSnapshot);
    };

    async createMerchantProduct(command: MerchantProductCommand): Promise<MerchantProduct> {
        const dataModel = await prisma.merchantProduct.create({
            data: {
                id: command.id,
                merchantId: command.merchantId,
                productId: command.productId,
            }
        });

        return dataModel && MerchantProduct.createFromSnapshot(dataModel);
    };
};