import dotenv from "dotenv";

import app from "./app.js";
import { connectDB } from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
	console.log("Server is running on port :", PORT);
	await connectDB();
});
