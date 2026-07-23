import type { Request, Response } from 'express';
import httpStatus from 'http-status';


class ProductImageController {
    constructor() {};

    public async getSingleProductImages(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };

    public async createImage(req: Request, res: Response): Promise<any> {
        const { productID, image } = req.body;
    };

    public async updateImage(req: Request, res: Response): Promise<any> {
        const { id } = req.params; // Getting product id from params
        const { productID, image } = req.body;
    };

    public async deleteImage(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
    };
}

export default new ProductImageController();