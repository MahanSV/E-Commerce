import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import {
    createWishItem, deleteWishItem,
    getAllWishlist,
    getAllWishlistByUserId,
    getSingleProductFromWishlist
} from "#webhost/controllers/wishlist.ts";

const router = express.Router();

router.get('/', authenticate, getAllWishlist);

router.post('/', authenticate, createWishItem);

router.get('/:userId', authenticate, getAllWishlistByUserId);

router.get('/:userId/:productId', authenticate, getSingleProductFromWishlist);

router.delete('/:userId/:productId', authenticate, deleteWishItem);

export default router;