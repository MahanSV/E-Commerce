import type {Request, Response} from "express";
import httpStatus from 'http-status';


class SlugController {
    constructor() {};

    public async getProductBySlug(req: Request, res: Response): Promise<any> {
        const { slug } = req.params;
    };
}

const slugController = new SlugController();

export const getProductBySlug = slugController.getProductBySlug.bind(slugController);