import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export default class MerchantProduct implements MerchantProductServiceInterface {
    private merchantProductRepository: MerchantProductRepositoryInterface;

    constructor(merchantProductRepository: MerchantProductRepositoryInterface = new MerchantProductRepository()) {
        this.merchantProductRepository = merchantProductRepository;
    };
};