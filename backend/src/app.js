import cors from "cors";
import express from "express";

import authRoute from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.use("/api/v1/auth", authRoute);

export default app;
