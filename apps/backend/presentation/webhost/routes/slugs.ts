import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import SlugController from '#webhost/controllers/slug.ts';
import validate from "#middlewares/validation.ts";
import {getProductBySlugSchema} from "#webhost/validators/slugs/slugs.ts";

const router = express.Router();

/**
 * @openapi
 * /slugs/{slug}:
 *   get:
 *     summary: Get a product by its slug
 *     description: Returns the product associated with the supplied URL-friendly slug.
 *     operationId: getProductBySlug
 *     tags:
 *       - Slugs
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: The unique product slug.
 *         schema:
 *           type: string
 *           minLength: 1
 *           example: wireless-headphones-demo
 *     responses:
 *       '200':
 *         description: Product found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: The slug is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: No product exists with this slug.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
    '/:slug',
    // authenticate,
    validate(getProductBySlugSchema),
    SlugController.getProductBySlug
);

export default router;
