import type { Request, Response } from 'express';
import httpStatus from 'http-status';


class ProductController {
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

export default new ProductController();