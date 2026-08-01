import type {Request, Response} from "express";
import httpStatus from 'http-status';
import {ProductService} from "#application/services/Product.js";
import ApiError from "#webhost/errors/apiError.js";

class SearchController {
    private productService: ProductService;

    constructor(productService = new ProductService()) {
        this.productService = productService;
    };

    public async searchProducts(req: Request, res: Response): Promise<any> {
        /*const { query } = req.query;*/
        try {
            const query = req.query.query;

            const searchedProducts = await this.productService.searchProducts(query);

            res.json(searchedProducts);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };
}

export default new SearchController();