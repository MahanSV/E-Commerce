import express from 'express';
import authenticate from "#middlewares/authenticityMiddlewares/authentication.ts";
import Wishlist from "#webhost/controllers/wishlist.js";

const router = express.Router();

router.get('/', authenticate, Wishlist.getAllWishlist);

router.post('/', authenticate, Wishlist.createWishItem);

router.get('/:userId', authenticate, Wishlist.getAllWishlistByUserId);

router.get('/:userId/:productId', authenticate, Wishlist.getSingleProductFromWishlist);

router.delete('/:userId/:productId', authenticate, Wishlist.deleteWishItem);

export default router;