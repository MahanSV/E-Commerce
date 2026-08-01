import httpStatus from "http-status";
import {ProductServiceInterface} from "#application/interfaces/ProductInterface.ts";
import {ProductRepositoryInterface} from "#domain/interfaces/ProductRepository.ts";
import ProductRepository from "#repositories/ProductRepository.ts";
import {ProductDTO, ProductImageDTO} from "#application/dto/ProductDTO.ts";
import ApiError from "#webhost/errors/apiError.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";
import {
    createImageCommand,
    createProductCommand,
    createProductImageCommand,
    updateProductCommand
} from "#application/types/product/command.ts";
import {ProductFactory} from "#domain/factories/ProductFactory.ts";
import {MerchantProductFactory} from "#domain/factories/MerchantProductFactory.ts";
import {MerchantProductRepositoryInterface} from "#domain/interfaces/MerchantProductRepository.ts";
import {ImageFactory} from "#domain/factories/ImageFactory.ts";


export class ProductService implements ProductServiceInterface {
    private productRepository: ProductRepositoryInterface;
    private merchantProductRepository: MerchantProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface = new ProductRepository(), merchantProductRepository: MerchantProductRepositoryInterface = new MerchantProductRepository()) {
        this.productRepository = productRepository;
        this.merchantProductRepository = merchantProductRepository;
    };

    async getProductBySlug(slug: string): Promise<ProductDTO[]> {
        const productBySlug = await this.productRepository.getProductBySlug(slug);

        return ProductMapper.toDTOList(productBySlug);
    };

    async searchProducts(query: any): Promise<ProductDTO[]> {
        const searchedProducts = await this.productRepository.searchProducts(query);

        return ProductMapper.toDTOList(searchedProducts);
    };

    // TODO: Needs to complete!
    async getAllProducts(mode: any): Promise<ProductDTO[]> {
        const allProducts = await this.productRepository.getAllProducts();

        return ProductMapper.toDTOList(allProducts);
    };

    async createProduct(command: createProductCommand): Promise<ProductDTO> {
        const entity = ProductFactory.create(command);

        const addProduct = await this.productRepository.createProduct(entity);

        if (!addProduct) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create product.", "Error");

        const merchantProductEntity = MerchantProductFactory.create(command.merchantId, entity.id);

        const addMerchantProduct = await this.merchantProductRepository.createMerchantProduct(
            merchantProductEntity
        );

        if (!addMerchantProduct) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create MerchantProduct.", "Error");

        return ProductMapper.toDTO(addProduct);
    };

    async getProductById(id: string): Promise<ProductDTO> {
        const product = await this.productRepository.getProductById(id);

        if (!product) throw new ApiError(httpStatus.NOT_FOUND, `Failed to get for productId: ${id}.`, "Error");

        return ProductMapper.toDTO(product);
    };

    async updateProduct(command: updateProductCommand): Promise<ProductDTO> {
        const product = await this.productRepository.getProductById(command.id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${command.id} doesn't exist.`, "Error");

        const updatedProduct = await this.productRepository.updateProduct(command);

        return ProductMapper.toDTO(updatedProduct);
    };

    async deleteProduct(id: string): Promise<ProductDTO> {
        const product = await this.productRepository.getProductById(id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${id} doesn't exist.`, "Error");


        const deletedProduct = await this.productRepository.deleteProduct(id);

        return ProductMapper.toDTO(deletedProduct);
    };

    async getSingleProductImages(id: string): Promise<ProductImageDTO> {
        const product = await this.productRepository.getProductById(id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${id} doesn't exist.`, "Error");

        return ProductMapper.toProductImageDTO(product);
    };


    async createImage(command: createProductImageCommand): Promise<ProductImageDTO[] | undefined> {
        const product = await this.productRepository.getProductById(command.id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${command.id} doesn't exist.`, "Error");

        const photos = [];

        photos.push(ImageFactory.create(command.photo));

        const newCommand = {
            id: command.id,
            photo: photos
        }

        const createdProductImage = await this.productRepository.createImage(newCommand);

        return ProductMapper.toProductImageDTO(createdProductImage);
    };
}