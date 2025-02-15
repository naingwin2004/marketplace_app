import express from "express";

import { register, login, checkAuth } from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkAuth", authMiddleware, checkAuth);

export default router;
