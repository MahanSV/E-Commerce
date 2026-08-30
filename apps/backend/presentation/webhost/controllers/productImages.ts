import type { Request, Response } from 'express';
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
            throw error;
        }
    };

    public async createImage(req: Request, res: Response): Promise<any> {
        /*const { productID, image } = req.body;*/
        try {
            const command = {
                id: req.body.productID, // Note: id = productID
                photo: req.body.image, // Note: photo = image
            };

            const createdProductImage = await this.productService.createImage(command);

            res.status(201).json(createdProductImage);
        } catch (error) {
            throw error;
        }
    };

    public async updateImage(req: Request, res: Response): Promise<any> {
        /*const { id } = req.params; */// Getting product id from params
        /*const { productID, image } = req.body;*/
        try {
            const command = {
                id: req.params.id,
                productID: req.body.productID,
                image: req.body.image,
            };

            const updateProductImage = await this.productService.updateImage(command);

            res.json(updateProductImage);
        } catch (error) {
            throw error;
        }
    };

    public async deleteImage(req: Request, res: Response): Promise<any> {
       /* const { id } = req.params;*/
        try {
            const id = req.params.id;

            const deletedProductImage = await this.productService.deleteImage(id);

            res.status(204).send();
        } catch (error) {
            throw error;
        }
    };
}

export default new ProductImageController();