import type { Request, Response } from 'express';
import httpStatus from 'http-status';


class Product {
    constructor() {};

    public async getAllProducts(req: Request, res: Response): Promise<any> {
        const mode = req.query.mode || "";
    };

    public async createProduct(req: Request, res: Response): Promise<any> {
        const {
            merchantId,
            slug,
            title,
            mainImage,
            price,
            description,
            manufacturer,
            categoryId,
            inStock,
        } = req.body;
    };

    public async getProductById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };
    public async updateProduct(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const {
            merchantId,
            slug,
            title,
            mainImage,
            price,
            rating,
            description,
            manufacturer,
            categoryId,
            inStock,
        } = req.body;
    };
    public async deleteProduct(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };
}

const product = new Product();

export const getAllProducts = product.getAllProducts.bind(product);
export const createProduct = product.createProduct.bind(product);
export const getProductById = product.getProductById.bind(product);
export const updateProduct = product.updateProduct.bind(product);
export const deleteProduct = product.deleteProduct.bind(product);