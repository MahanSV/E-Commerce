import type {Request, Response} from "express";
import httpStatus from 'http-status';
import {ProductService} from "#application/services/Product.ts";

class SearchController {
    private productService: ProductService;

    constructor(productService = new ProductService()) {
        this.productService = productService;
    };

    public searchProducts = async (req: Request, res: Response): Promise<any> => {
        /*const { query } = req.query;*/
        try {
            const query = req.query.query;

            const searchedProducts = await this.productService.searchProducts(query);

            res.json(searchedProducts);
        } catch (error) {
            throw error;
        }
    };
}

export default new SearchController();