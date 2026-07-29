import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';

export class Product implements ProductServiceInterfac {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface = new ProductRepository()) {
        this.productRepository = productRepository;
    };
}