import express from "express";

import {
	saveProduct,
	getSave,
	getSaveProduct,
	unSave,
} from "../controllers/save.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id", authMiddleware, saveProduct);
router.get("/getSave", authMiddleware, getSave);
router.get("/getSaveProduct", authMiddleware, getSaveProduct);
router.delete("/unSave/:id", authMiddleware, unSave);

export default router;
