import CategoryRepository from "#repositories/CategoryRepository.ts";
import { CategoryRepositoryInterface } from "#domain/interfaces/CategoryRepository.ts";
import { CategoryServiceInterface } from "#application/interfaces/CategoryInterface.ts";
import ApiError from '#webhost/errors/apiError.ts';
import httpStatus from 'http-status';
import {CategoryDTO} from "#application/dto/CategoryDTO.ts";
import {CategoryMapper} from "#application/mappers/CategoryMapper.ts";
import { ProductRepositoryInterface } from "#domain/interfaces/ProductRepository.ts";
import ProductRepository from "#repositories/ProductRepository.ts";

export default class CategoryService implements CategoryServiceInterface {
    private categoryRepository: CategoryRepositoryInterface;
    private productRepository: ProductRepositoryInterface;

    constructor(categoryRepository: CategoryRepositoryInterface = new CategoryRepository(), productRepository: ProductRepositoryInterface = new ProductRepository()) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    };

    async getAllCategories(): Promise<CategoryDTO[]> {
        const allCategories = await this.categoryRepository.getAllCategories();

        return allCategories.length > 0 ? CategoryMapper.toDTOList(allCategories): [];
    };

    async createCategory(name: string): Promise<CategoryDTO> {
        name = name.trim();

        const addCategory = await this.categoryRepository.createCategory(name);

        if (!addCategory) throw new ApiError(httpStatus.CONFLICT, "Failed to create Category.", "Error");

        return CategoryMapper.toDTO(addCategory);
    };

    async getCategory(id:string): Promise<CategoryDTO> {
        const category = await this.categoryRepository.getCategoryById(id);

        if (!category) throw new ApiError(httpStatus.BAD_REQUEST, "Failed to find Category.", "Error");

        return CategoryMapper.toDTO(category);
    };

    async updateCategory(id:string, name: string): Promise<CategoryDTO> {
        const category = await this.categoryRepository.getCategoryById(id);

        if (!category) throw new ApiError(httpStatus.BAD_REQUEST, "Failed to find Category.", "Error");

        const updateCategory = await this.categoryRepository.updateCategory(id, name);

        if (!updateCategory) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update Category.", "Error");

        return updateCategory && CategoryMapper.toDTO(updateCategory);
    };

    async deleteCategory(id:string): Promise<void> {
        const category = await this.categoryRepository.getCategoryById(id);

        if (!category) throw new ApiError(httpStatus.BAD_REQUEST, "Category doesn't exist.", "Error");

        const matchedProducts = await this.productRepository.getAllProductsByCategoryId(id);

        if (matchedProducts.length > 0) throw new ApiError(httpStatus.BAD_REQUEST, "Unable to delete category with products.", "Error");

        const deleteCategory = await this.categoryRepository.deleteCategory(id);

        if (!deleteCategory) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to delete Category.", "Error");
    };
};