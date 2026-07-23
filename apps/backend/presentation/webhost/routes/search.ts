import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SearchController from '#webhost/controllers/search.ts';

const router = express.Router();

router.get('/', authenticate, SearchController.searchProducts);

export default router;