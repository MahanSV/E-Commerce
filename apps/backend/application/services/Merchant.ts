import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export default class Merchant implements MerchantServiceInterface {
    private merchantRepository: MerchantRepositoryInterface;

    constructor(merchantRepository: MerchantRepositoryInterface = new MerchantRepository()) {
        this.merchantRepository = merchantRepository;
    };
};