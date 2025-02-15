import jwt from "jsonwebtoken"

export const generateToken = async (userId) => {
	const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	return token;
};

