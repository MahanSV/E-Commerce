import type { Request, Response } from 'express';
import httpStatus from 'http-status';


class ProductController {
    constructor() {};

    public async getAllProducts(req: Request, res: Response): Promise<any> {
        const mode = req.query.mode || "";
    };

    public async createProduct(req: Request, res: Response): Promise<any> {
        /*const {
            merchantId,
            slug,
            title,
            mainImage,
            price,
            description,
            manufacturer,
            categoryId,
            inStock,
        } = req.body;*/

        const command = {
            merchantId: req.body.merchantId,
            slug: req.body.slug,
            title: req.body.title,
            mainImage: req.body.mainImage,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            categoryId: req.body.categoryId,
            inStock: req.body.inStock,
        };
    };

    public async getProductById(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };
    public async updateProduct(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;
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
        } = req.body;*/
        const command = {
            id: req.params.id,
            merchantId: req.body.merchantId,
            slug: req.body.slug,
            title: req.body.title,
            mainImage: req.body.mainImage,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            categoryId: req.body.categoryId,
            inStock: req.body.inStock,
        };
    };
    public async deleteProduct(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };
}

export default new ProductController();