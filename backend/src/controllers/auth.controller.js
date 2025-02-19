import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		if (!username || !email || !password) {
			return res
				.status(400)
				.json({ message: "All fields are required!" });
		}
		if (!emailPattern.test(email)) {
			return res.status(400).json({ message: "Invalid email" });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.json({ message: "Password must be at least 6 characters" });
		}
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "email alredy exists" });
		}

		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			username,
			email,
			password: hashPassword,
		});
		const token = await generateToken(newUser._id);

		return res.status(201).json({
			message: "user created successfully",
			user: {
				id: newUser._id,
				email: newUser.email,
				role: newUser.role,
				username: newUser.username,
				createdAt: newUser.createdAt,
			},
			token,
		});
	} catch (err) {
		console.log("Error in signup :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "All fields are required!" });
		}
		if (!emailPattern.test(email)) {
			return res.status(400).json({ message: "Invalid email" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "email doesn't exists" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(400).json({ message: "Invalid credential" });
		}
		const token = await generateToken(user._id);
		return res.status(200).json({
			message: "login successfully",
			user: {
				id: user._id,
				email: user.email,
				role: user.role,
				username: user.username,
				createdAt: user.createdAt,
			},
			token,
		});
	} catch (err) {
		console.log("Error in login :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const checkAuth = async (req, res) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId).select(
			"username role email createdAt _id",
		);
		if (!user) {
			return res.status(400).json({
				message: "Unauthorized User",
			});
		}
		return res.status(200).json({
			message: "User authenticated",
			user,
		});
	} catch (err) {
		console.log("Error in checkAuth :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
