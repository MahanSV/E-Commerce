import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import MerchantController from '#webhost/controllers/merchant.ts';
import validate from "#middlewares/validation.ts";
import {
    createMerchantSchema, deleteMerchantSchema,
    getMerchantByIdSchema,
    updateMerchantSchema
} from "#webhost/validators/mercahnt/merchant.ts";

const router = express.Router();

// Get all merchants
router.get(
    "/",
    authenticate,
    MerchantController.getAllMerchants
);

// Get a specific merchant by ID
router.get(
    "/:id",
    authenticate,
    validate(getMerchantByIdSchema),
    MerchantController.getMerchantById
);

// Create a new merchant
router.post(
    "/",
    authenticate,
    validate(createMerchantSchema),
    MerchantController.createMerchant
);

// Update a merchant
router.put(
    "/:id",
    authenticate,
    validate(updateMerchantSchema),
    MerchantController.updateMerchant
);

// Delete a merchant
router.delete(

    "/:id",
    authenticate,
    validate(deleteMerchantSchema),
    MerchantController.deleteMerchant
);

export default router;