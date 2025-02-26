import express from "express";
import multer from "multer";
import {
	createProduct,
	getAllProducts,
	getOldProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {handleMulterErrors} from "../middleware/multer.js";

const router = express.Router();



router.post(
	"/create-product",
	authMiddleware,
	handleMulterErrors,
	createProduct,
);

router.post("/edit-product/:id", authMiddleware, updateProduct);
router.get("/getall-products", authMiddleware, getAllProducts);
router.get("/getold-product/:id", authMiddleware, getOldProduct);
router.delete("/delete-product/:id/:seller", authMiddleware, deleteProduct);

export default router;
