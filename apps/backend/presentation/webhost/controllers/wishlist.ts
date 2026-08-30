import type { Request, Response } from 'express';
import httpStatus from 'http-status';

// Note: he didn't complete this segment
class WishlistController {
    constructor() {};

    public getAllWishlist = async (req: Request, res: Response): Promise<any> => {};
    public createWishItem = async (req: Request, res: Response): Promise<any> => {};
    public getAllWishlistByUserId = async (req: Request, res: Response): Promise<any> => {};
    public getSingleProductFromWishlist = async (req: Request, res: Response): Promise<any> => {};
    public deleteWishItem = async (req: Request, res: Response): Promise<any> => {};
}

export default new WishlistController();