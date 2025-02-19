import express from "express";

import { createProduct } from "../controllers/product.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-product",authMiddleware, createProduct);

export default router;
