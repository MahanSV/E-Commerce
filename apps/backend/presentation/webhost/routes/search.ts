import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {searchProducts} from "#webhost/controllers/search.ts";

const router = express.Router();

router.get('/', authenticate, searchProducts);

export default router;