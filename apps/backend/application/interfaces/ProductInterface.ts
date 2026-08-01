import {ProductDTO} from "#application/dto/ProductDTO.ts";
import {createProductCommand, updateProductCommand} from "#application/types/product/command.ts";


export interface ProductServiceInterface {
    getProductBySlug(slug: string): Promise<ProductDTO[]>
    searchProducts(query: any): Promise<ProductDTO[]>
    getAllProducts(mode: any): Promise<ProductDTO[]>
    createProduct(command: createProductCommand): Promise<ProductDTO>
    getProductById(id: string): Promise<ProductDTO>
    updateProduct(command: updateProductCommand): Promise<ProductDTO>
    deleteProduct(id: string): Promise<ProductDTO>
}