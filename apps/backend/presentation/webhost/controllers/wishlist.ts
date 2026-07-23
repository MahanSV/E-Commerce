import type { Request, Response } from 'express';
import httpStatus from 'http-status';

// Note: he didn't complete this segment
class WishlistController {
    constructor() {};

    public async getAllWishlist(req: Request, res: Response): Promise<any> {};
    public async createWishItem(req: Request, res: Response): Promise<any> {};
    public async getAllWishlistByUserId(req: Request, res: Response): Promise<any> {};
    public async getSingleProductFromWishlist(req: Request, res: Response): Promise<any> {};
    public async deleteWishItem(req: Request, res: Response): Promise<any> {};
}

export default new WishlistController();