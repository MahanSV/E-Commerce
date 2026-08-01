import type {Request, Response} from "express";
import ApiError from "#webhost/errors/apiError.ts";
import {ProductService} from "#application/services/Product.ts";


class SlugController {
    private productService: ProductService;

    constructor(productService = new ProductService()) {
        this.productService = productService;
    };

    public async getProductBySlug(req: Request, res: Response): Promise<any> {
        /*const { slug } = req.params;*/
        try {
            const slug = req.params.slug;

            const productSlug = await this.productService.getProductBySlug(slug);

            res.json(productSlug);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new SlugController();