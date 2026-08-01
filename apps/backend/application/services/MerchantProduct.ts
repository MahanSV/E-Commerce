import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import {MerchantProductServiceInterface} from "#application/interfaces/MerchantProductInterface.ts";
import {MerchantProductRepositoryInterface} from "#domain/interfaces/MerchantProductRepository.ts";
import MerchantProductRepository from "#repositories/MerchantProductRepository.ts";
import {MerchantProductFactory} from "#domain/factories/MerchantProductFactory.ts";
import MerchantProduct from '#models/MerchantProduct.ts';

export default class MerchantProductService implements MerchantProductServiceInterface {
    private merchantProductRepository: MerchantProductRepositoryInterface;

    constructor(merchantProductRepository: MerchantProductRepositoryInterface = new MerchantProductRepository()) {
        this.merchantProductRepository = merchantProductRepository;
    };

    /*async createMerchantProduct(merchantId: string, productId: string): Promise<MerchantProduct> {
        const entity = MerchantProductFactory.create(merchantId, productId);

        const addMerchantProduct = await this.merchantProductRepository.createMerchantProduct(entity);

        return {
            id: addMerchantProduct.id,
            merchantId: addMerchantProduct.merchantId,
            productId: addMerchantProduct.productId
        };
    };*/
};