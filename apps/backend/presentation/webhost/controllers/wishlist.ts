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

const wishListController = new WishlistController();

export const getAllWishlist = wishListController.getAllWishlist.bind(wishListController);
export const createWishItem = wishListController.createWishItem.bind(wishListController);
export const getAllWishlistByUserId = wishListController.getAllWishlistByUserId.bind(wishListController);
export const getSingleProductFromWishlist = wishListController.getSingleProductFromWishlist.bind(wishListController);
export const deleteWishItem = wishListController.deleteWishItem.bind(wishListController);