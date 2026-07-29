import type {Request, Response} from "express";
import httpStatus from 'http-status';

class SearchController {
    constructor() {};

    public async searchProducts(req: Request, res: Response): Promise<any> {
        /*const { query } = req.query;*/
        const query = req.query.query;
    };
}

export default new SearchController();