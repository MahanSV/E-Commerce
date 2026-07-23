import type {Request, Response} from "express";
import httpStatus from 'http-status';

class SearchController {
    constructor() {};

    public async searchProducts(req: Request, res: Response): Promise<any> {
        const { query } = req.query;
    };
}

const searchController = new SearchController();

export const searchProducts = searchController.searchProducts.bind(searchController);