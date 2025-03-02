export const adminMiddleware = async (req, res, next) => {
	const role = req.role;
	try {
		if (role !== "admin") {
			return res.status(403).json({ message: "Forbidden: Admins only" });
		}
		next();
	} catch (err) {
		console.log("Error in adminMiddleware :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
