import type { Request, Response } from 'express';
import {ProductService} from "#application/services/Product.ts";

class ProductController {
    private productService: ProductService;

    constructor(productService = new ProductService()) {
        this.productService = productService;
    };

    public getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const mode = String(req.query.mode || "");
            const page = Number(req.query.page) || 1;

            const products = await this.productService.getAllProducts({
                mode,
                page,
                url: req.originalUrl,
            });

            res.json(products);
        } catch (error) {
            throw error;
        }
    };

    public createProduct = async(req: Request, res: Response): Promise<any> => {
        try {
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

            const product = await this.productService.createProduct(command);

            res.status(201).json(product);
        } catch (error) {
            throw error;
        }
    };

    public getProductById = async(req: Request, res: Response): Promise<any> => {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const product = await this.productService.getProductById(id);

            res.json(product);
        } catch (error) {
            throw error;
        }
    };

    public async updateProduct(req: Request, res: Response): Promise<any> {
        try {
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

            const product = await this.productService.updateProduct(command);

            res.json(product);
        } catch (error) {
            throw error;
        }
    };

    public deleteProduct = async(req: Request, res: Response): Promise<any> => {
        try {
            const id = req.params.id;

            await this.productService.deleteProduct(id);

            res.status(204).send();
        } catch (error) {
            throw error;
        }
    };
}

export default new ProductController();