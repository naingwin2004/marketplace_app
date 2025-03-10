import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const page = +req.query.page || 1;
		const sort = +req.query.sort || -1;
		const limit = 10;

		const status = +req.query?.status;

		const totalProducts = await Product.find().countDocuments();
		const totalPages = Math.ceil(totalProducts / limit);
		const products = await Product.find()
			.populate("seller", "email")
			.sort({
				createdAt: sort,
			})
			.skip((page - 1) * limit)
			.limit(limit);

		return res.status(200).json({
			message: "Welcome Admin",
			products,
			totalPages,
		});
	} catch (err) {
		console.log("Error in getAllProducts :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const productStatus = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({
				message: "No product found",
			});
		}
		if (!status) {
			return res.status(400).json({
				message: "status required",
			});
		}
		product.status = status;
		await product.save();
		return res.status(200).json({
			message: "product approve",
		});
	} catch (err) {
		console.log("Error in productStatus :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getAllUser = async (req, res) => {
	try {
		const page = +req.query.page || 1;
		const limit = 10;

		const totalUser = await User.countDocuments({ role: "user" });
		const totalPages = Math.ceil(totalUser / limit);
		const users = await User.find({ role: "user" })
			.sort({
				createdAt: -1,
			})
			.skip((page - 1) * limit)
			.limit(limit);

		return res.status(200).json({
			message: "Welcome Admin",
			users,
			totalPages,
		});
	} catch (err) {
		console.log("Error in getAllProducts :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const userStatus = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				message: "No User found",
			});
		}
		if (!status) {
			return res.status(400).json({
				message: "status required",
			});
		}
		user.status = status;
		await user.save();
		return res.status(200).json({
			message: "product approve",
		});
	} catch (err) {
		console.log("Error in userStatus :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
