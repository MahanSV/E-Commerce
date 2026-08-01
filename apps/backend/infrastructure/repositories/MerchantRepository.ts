import prisma from '#context/dbContext/prisma/client.ts';
import {BaseRepository} from "#repositories/BaseRepository.ts";
import {MerchantRepositoryInterface} from "#domain/interfaces/MerchantRepository.ts";
import Merchant from "#models/Merchant.ts";

export default class MerchantRepository extends BaseRepository<Merchant> implements MerchantRepositoryInterface {
    constructor() {
        super(Merchant.createFromSnapshot);
    };
};