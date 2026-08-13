import {ProductDTO, ProductImageDTO} from "#application/dto/ProductDTO.ts";
import {
    createProductCommand,
    createProductImageCommand,
    updateProductCommand, updateProductImageCommand
} from "#application/types/product/command.ts";


export interface ProductServiceInterface {
    getProductBySlug(slug: string): Promise<ProductDTO[]>
    searchProducts(query: any): Promise<ProductDTO[]>
    getAllProducts(params: { mode: string; page: number; url: string }): Promise<ProductDTO[]>
    createProduct(command: createProductCommand): Promise<ProductDTO>
    getProductById(id: string): Promise<ProductDTO>
    updateProduct(command: updateProductCommand): Promise<ProductDTO>
    deleteProduct(id: string): Promise<ProductDTO>
    getSingleProductImages(id: string): Promise<ProductImageDTO[] | undefined>
    createImage(command: createProductImageCommand): Promise<ProductImageDTO[] | undefined>
    updateImage(command:updateProductImageCommand): Promise<ProductImageDTO[] | undefined>
    deleteImage(id: string): Promise<ProductImageDTO[] | undefined>
}