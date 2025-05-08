import cors from "cors";
import express from "express";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import adminRoute from "./routes/admin.route.js";
import saveRouter from "./routes/save.route.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.use("/api/v1", productRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/save", saveRouter);

export default app;
