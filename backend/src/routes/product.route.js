import express from "express";
import multer from "multer";
import {
	createProduct,
	getAllProducts,
	getOldProduct,
	updateProduct,
	deleteProduct,
	deleteImage,
	publicProducts,
	publicProductDetails
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { handleMulterErrors } from "../middleware/multer.js";

const router = express.Router();

router.post(
	"/create-product",
	authMiddleware,
	handleMulterErrors,
	createProduct,
);

router.post("/edit-product", authMiddleware, handleMulterErrors, updateProduct);
router.get("/getall-products", authMiddleware, getAllProducts);
router.get("/getold-product/:id", authMiddleware, getOldProduct);
router.delete(
	"/delete-product/:id/seller/:seller",
	authMiddleware,
	deleteProduct,
);
router.delete("/delete-image/:id/seller/:seller/image-id/:public_id", authMiddleware, deleteImage);

router.get("/",publicProducts)
router.get("/:id",publicProductDetails)

export default router;
