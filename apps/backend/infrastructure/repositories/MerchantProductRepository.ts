import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import MerchantProduct from "#models/MerchantProduct.ts";
import {MerchantProductRepositoryInterface} from "#domain/interfaces/MerchantProductRepository.ts";

export default class MerchantProductRepository extends BaseRepository<MerchantProduct> implements MerchantProductRepositoryInterface {
    constructor() {
        super(MerchantProduct.createFromSnapshot);
    };
};