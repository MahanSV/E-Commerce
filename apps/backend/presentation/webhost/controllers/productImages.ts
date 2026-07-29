import type { Request, Response } from 'express';
import httpStatus from 'http-status';


class ProductImageController {
    constructor() {};

    public async getSingleProductImages(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        const id = req.params.id;
    };

    public async createImage(req: Request, res: Response): Promise<any> {
        /*const { productID, image } = req.body;*/
        const command = {
            productID: req.body.productID,
            image: req.body.image,
        };
    };

    public async updateImage(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params; */// Getting product id from params
        /*const { productID, image } = req.body;*/

        const command = {
            id: req.params.id,
            productID: req.body.productID,
            image: req.body.image,
        };
    };

    public async deleteImage(req: Request, res: Response): Promise<any> {
       /* const { id } = req.params;*/
        const id = req.params.id;
    };
}

export default new ProductImageController();