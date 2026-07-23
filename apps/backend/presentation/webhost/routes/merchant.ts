import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import {
    createMerchant,
    deleteMerchant,
    getAllMerchants,
    getMerchantById,
    updateMerchant
} from "#webhost/controllers/merchant.ts";

const router = express.Router();

// Get all merchants
router.get("/", authenticate, getAllMerchants);

// Get a specific merchant by ID
router.get("/:id", authenticate, getMerchantById);

// Create a new merchant
router.post("/", authenticate, createMerchant);

// Update a merchant
router.put("/:id", authenticate, updateMerchant);

// Delete a merchant
router.delete("/:id", authenticate, deleteMerchant);

export default router;