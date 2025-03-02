import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, (req, res) => {
	return res.json("Welcome admin");
});

export default router;
