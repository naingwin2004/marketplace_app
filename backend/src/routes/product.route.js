import express from "express";

import {
	createProduct,
	getAllProducts,
	getOldProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-product", authMiddleware, createProduct);
router.post("/edit-product/:id", authMiddleware, updateProduct);

router.get("/getall-products", authMiddleware, getAllProducts);
router.get("/getold-product/:id", authMiddleware, getOldProduct);

router.delete("/delete-product/:id/:seller", authMiddleware, deleteProduct);
export default router;
