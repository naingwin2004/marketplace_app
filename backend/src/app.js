import cors from "cors";
import express from "express";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productRoute);

export default app;
