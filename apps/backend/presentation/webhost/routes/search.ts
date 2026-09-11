import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SearchController from '#webhost/controllers/search.ts';
import validate from "#middlewares/validation.ts";
import {searchProductsSchema} from "#webhost/validators/search/search.ts";

const router = express.Router();

router.get(
    '/',
    // authenticate,
    validate(searchProductsSchema),
    SearchController.searchProducts
);

export default router;