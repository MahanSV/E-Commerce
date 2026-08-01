import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from "#webhost/errors/apiError.ts";
import {ProductService} from "#application/services/Product.ts";


class ProductImageController {
    private productService: ProductService;

    constructor(productService = new ProductService()) {
        this.productService = productService;
    };

    public async getSingleProductImages(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params;*/
        try {
            const id = req.params.id;

            const productImage = await this.productService.getSingleProductImages(id);

            res.json(productImage);
        } catch (error) {
            if (error instanceof ApiError) throw error;
        }
    };

    public async createImage(req: Request, res: Response): Promise<any> {
        /*const { productID, image } = req.body;*/
        const command = {
            id: req.body.productID, // Note: id = productID
            photo: req.body.image, // Note: photo = image
        };

        const createdProductImage = await this.productService.createImage(command);

        res.json(createdProductImage);
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