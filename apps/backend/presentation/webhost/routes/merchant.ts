import express from 'express';
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import MerchantController from '#webhost/controllers/merchant.ts'

const router = express.Router();

// Get all merchants
router.get("/", authenticate, MerchantController.getAllMerchants);

// Get a specific merchant by ID
router.get("/:id", authenticate, MerchantController.getMerchantById);

// Create a new merchant
router.post("/", authenticate, MerchantController.createMerchant);

// Update a merchant
router.put("/:id", authenticate, MerchantController.updateMerchant);

// Delete a merchant
router.delete("/:id", authenticate, MerchantController.deleteMerchant);

export default router;