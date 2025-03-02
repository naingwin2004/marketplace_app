import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res
				.status(401)
				.json({ message: "Unauthorized: No token provided" });
		}
		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.userId = decoded.userId;
		req.role = decoded.role;
		next();
	} catch (err) {
		console.log("Error in authMiddleware :", err.message);
		return res.status(401).json({ message: "Unauthorized: Invalid token" });
	}
};
