import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

import {
	getAllProducts,
	productStatus,
	getAllUser,
	userStatus
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/products", authMiddleware, adminMiddleware, getAllProducts);

router.get("/users", authMiddleware, adminMiddleware, getAllUser);

router.post(
	"/product-status/:id",
	authMiddleware,
	adminMiddleware,
	productStatus,
);

router.post(
	"/user-status/:id",
	authMiddleware,
	adminMiddleware,
	userStatus,
);

export default router;
