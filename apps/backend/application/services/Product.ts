import httpStatus from "http-status";
import {ProductServiceInterface} from "#application/interfaces/ProductInterface.ts";
import {ProductRepositoryInterface} from "#domain/interfaces/ProductRepository.ts";
import ProductRepository from "#repositories/ProductRepository.ts";
import {ProductDTO, ProductImageDTO} from "#application/dto/ProductDTO.ts";
import ApiError from "#webhost/errors/apiError.ts";
import {ProductMapper} from "#application/mappers/ProductMapper.ts";
import {
    createProductCommand,
    createProductImageCommand, GetFilteredProductsParams,
    updateProductCommand, updateProductImageCommand
} from "#application/types/product/command.ts";
import {ProductFactory} from "#domain/factories/ProductFactory.ts";
import {MerchantProductFactory} from "#domain/factories/MerchantProductFactory.ts";
import {MerchantProductRepositoryInterface} from "#domain/interfaces/MerchantProductRepository.ts";
import {ImageFactory} from "#domain/factories/ImageFactory.ts";
import MerchantProductRepository from "#repositories/MerchantProductRepository.ts";
import { MerchantRepositoryInterface } from "#domain/interfaces/MerchantRepository.ts";
import MerchantRepository from "#repositories/MerchantRepository.ts";


export class ProductService implements ProductServiceInterface {
    private productRepository: ProductRepositoryInterface;
    private merchantProductRepository: MerchantProductRepositoryInterface;
    private merchantRepository: MerchantRepositoryInterface;
    // Security: Define whitelists for allowed filter types and operators
    private readonly ALLOWED_FILTER_TYPES = ['price', 'rating', 'category', 'inStock', 'outOfStock'];
    private readonly ALLOWED_OPERATORS = ['gte', 'lte', 'gt', 'lt', 'equals', 'contains'];
    private readonly ALLOWED_SORT_VALUES = ['defaultSort', 'titleAsc', 'titleDesc', 'lowPrice', 'highPrice'];

    constructor(
        productRepository: ProductRepositoryInterface = new ProductRepository(),
        merchantProductRepository: MerchantProductRepositoryInterface = new MerchantProductRepository(),
        merchantRepository: MerchantRepositoryInterface = new MerchantRepository()
    ) {
        this.productRepository = productRepository;
        this.merchantProductRepository = merchantProductRepository;
        this.merchantRepository = merchantRepository;
    };

    async getProductBySlug(slug: string): Promise<ProductDTO> {
        const productBySlug = await this.productRepository.getProductBySlug(slug);

        if (productBySlug.length === 0)
            throw new ApiError(httpStatus.NOT_FOUND, "Product not found", "Error");

        const productDTOs = ProductMapper.toDTOList(productBySlug);

        // Note: The code base assumed there is only one product with that slug
        return productDTOs[0];
    };

    async searchProducts(query: any): Promise<ProductDTO[]> {
        const searchedProducts = await this.productRepository.searchProducts(query);

        return ProductMapper.toDTOList(searchedProducts);
    };


    async getAllProducts(params: { mode: string; page: number; url: string }): Promise<ProductDTO[]> {
        const { mode, page, url } = params;

        // checking if we are on the admin products page
        if (mode === "admin") {
            const adminProducts = await this.productRepository.getAllProducts();
            return ProductMapper.toDTOList(adminProducts);
        } else {
            const dividerLocation = url.indexOf("?");
            let filterObj = {};
            let sortByValue = "defaultSort";

            const validatedPage = (page && page > 0) ? page : 1;

            if (dividerLocation !== -1) {
                const queryArray = url.substring(dividerLocation + 1, url.length).split("&");
                let filterType;
                let filterArray = [];

                for (let i = 0; i < queryArray.length; i++) {
                    const queryParam = queryArray[i];

                    if (queryParam.includes("filters")) {
                        if (queryParam.includes("price")) filterType = "price";
                        else if (queryParam.includes("rating")) filterType = "rating";
                        else if (queryParam.includes("category")) filterType = "category";
                        else if (queryParam.includes("inStock")) filterType = "inStock";
                        else if (queryParam.includes("outOfStock")) filterType = "outOfStock";
                        else continue;
                    }

                    if (queryParam.includes("sort")) {
                        const extractedSortValue = queryParam.substring(queryParam.indexOf("=") + 1);
                        if (this.validateSortValue(extractedSortValue)) {
                            sortByValue = extractedSortValue;
                        }
                    }

                    if (queryParam.includes("filters") && filterType) {
                        let filterValue;
                        if (filterType === "category") {
                            filterValue = queryParam.substring(queryParam.indexOf("=") + 1);
                        } else {
                            const numValue = parseInt(queryParam.substring(queryParam.indexOf("=") + 1));
                            filterValue = isNaN(numValue) ? null : numValue;
                        }

                        const operatorStart = queryParam.indexOf("$") + 1;
                        const operatorEnd = queryParam.indexOf("=") - 1;

                        if (operatorStart > 0 && operatorEnd > operatorStart) {
                            const filterOperator = queryParam.substring(operatorStart, operatorEnd);
                            if (filterValue !== null && filterOperator) {
                                filterArray.push({ filterType, filterOperator, filterValue });
                            }
                        }
                    }
                }
                filterObj = this.buildSafeFilterObject(filterArray);
            }

            const repoParams: GetFilteredProductsParams = {
                page: validatedPage,
                filterObj,
                sortByValue
            };

            const products = await this.productRepository.getFilteredProducts(repoParams);
            return ProductMapper.toDTOList(products);
        }
    };

    async createProduct(command: createProductCommand): Promise<ProductDTO> {
        const matchedToMerchant = await this.merchantRepository.getMerchantById(command.merchantId);

        if (!matchedToMerchant) throw new ApiError(httpStatus.BAD_REQUEST, "Merchant doesn't exist.", "Error");

        const entity = ProductFactory.create(command);

        const addProduct = await this.productRepository.createProduct(entity);

        if (!addProduct) throw new ApiError(httpStatus.CONFLICT, "Failed to create product.", "Error");

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

        if (!product) throw new ApiError(httpStatus.NOT_FOUND, `productId: ${command.id} doesn't exist.`, "Error");

        const updatedProduct = await this.productRepository.updateProduct(command);

        return ProductMapper.toDTO(updatedProduct);
    };

    async deleteProduct(id: string): Promise<ProductDTO> {
        const product = await this.productRepository.getProductById(id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${id} doesn't exist.`, "Error");

        const deletedProduct = await this.productRepository.deleteProduct(id);

        return ProductMapper.toDTO(deletedProduct);
    };

    async getSingleProductImages(id: string): Promise<ProductImageDTO[] | undefined> {
        const product = await this.productRepository.getProductById(id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${id} doesn't exist.`, "Error");

        return ProductMapper.toProductImageDTO(product);
    };

    async createImage(command: createProductImageCommand): Promise<ProductImageDTO[] | undefined> {
        const product = await this.productRepository.getProductById(command.id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${command.id} doesn't exist.`, "Error");

        const photos: Array<{imageID: string, image: string}> = [];

        photos.push(ImageFactory.create(command.photo));

        const newCommand = {
            id: command.id,
            photo: photos
        };

        const createdProductImage = await this.productRepository.updateProductImage(newCommand);

        return ProductMapper.toProductImageDTO(createdProductImage);
    };

    async updateImage(command:updateProductImageCommand): Promise<ProductImageDTO[] | undefined> {
        const product = await this.productRepository.getProductById(command.id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${command.id} doesn't exist.`, "Error");

        if (!product.photo) throw new ApiError(httpStatus.NOT_FOUND, `productId: ${command.id} doesn't have any image.`, "Error");

        const updatedPhoto = product.photo.map(item => {
            return {
                imageID: item.imageID,
                image: command.image,
            };
        });

        const newCommand = {
            id: command.id,
            photo: updatedPhoto
        };

        const updatedProductImage = await this.productRepository.updateProductImage(newCommand);

        return ProductMapper.toProductImageDTO(updatedProductImage);
    };

    async deleteImage(id: string): Promise<ProductImageDTO[] | undefined> {
        const product = await this.productRepository.getProductById(id);

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, `productId: ${id} doesn't exist.`, "Error");

        const deletedProductImage = await this.productRepository.deleteProductImage(id);

        return ProductMapper.toProductImageDTO(deletedProductImage);
    };

    // Security: Input validation functions
    private validateFilterType(filterType: string): boolean {
        return this.ALLOWED_FILTER_TYPES.includes(filterType);
    };

    private validateOperator(operator: string): boolean {
        return this.ALLOWED_OPERATORS.includes(operator);
    };

    private validateSortValue(sortValue: string): boolean {
        return this.ALLOWED_SORT_VALUES.includes(sortValue);
    };

    private validateAndSanitizeFilterValue(filterType: string, filterValue: any): any {
        switch (filterType) {
            case 'price':
            case 'rating':
            case 'inStock':
            case 'outOfStock':
                const numValue = parseInt(filterValue);
                return isNaN(numValue) ? null : numValue;
            case 'category':
                return typeof filterValue === 'string' && filterValue.trim().length > 0
                    ? filterValue.trim()
                    : null;
            default:
                return null;
        }
    };

    private buildSafeFilterObject(filterArray: Array<any>): any {
        const filterObj: any = {};
        for (const item of filterArray) {
            if (!this.validateFilterType(item.filterType)) continue;
            if (!this.validateOperator(item.filterOperator)) continue;
            const sanitizedValue = this.validateAndSanitizeFilterValue(item.filterType, item.filterValue);
            if (sanitizedValue === null) continue;
            filterObj[item.filterType] = { [item.filterOperator]: sanitizedValue };
        }
        return filterObj;
    };
}