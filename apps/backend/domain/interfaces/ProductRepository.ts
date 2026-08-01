import Product from "#models/Product.ts";
import {createImageCommand, updateProductCommand} from "#application/types/product/command.ts";


export interface ProductRepositoryInterface {
    getProductBySlug(slug: string): Promise<Product[]>
    searchProducts(query: any): Promise<Product[]>
    getAllProducts(): Promise<Product[]>
    createProduct(product: Product): Promise<Product>
    getProductById(id: string): Promise<Product | null>
    updateProduct(command: updateProductCommand): Promise<Product>
    deleteProduct(id: string): Promise<Product>
    createImage(command: createImageCommand): Promise<Product>
}