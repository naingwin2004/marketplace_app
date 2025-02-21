import User from "../models/user.model.js";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
	const { name, description, category, price, voucher, warranty } = req.body;
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "Unauthorized User",
			});
		}
		const newProduct = await Product.create({
			name,
			description,
			category,
			price,
			voucher,
			warranty,
			seller: userId,
		});
		return res.status(201).json({
			message: "product created successfully",
			product: newProduct,
		});
	} catch (err) {
		console.log("Error in createProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getAllProducts = async (req, res) => {
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		const products = await Product.find({ seller: userId }).sort({
			createdAt: -1,
		});
		return res.status(200).json({
			products,
		});
	} catch (err) {
		console.log("Error in getAllProducts :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getOldProduct = async (req, res) => {
	const userId = req.userId;
	const id = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		if (!id) {
			return res.status(400).json({
				message: "Somthing went wrong",
			});
		}
		const oldProduct = await Product.findById(id);
		if (!oldProduct) {
			return res.status(400).json({
				message: "oldProduct not found",
			});
		}
		return res.status(200).json({
			message: "oldProduct found",
			oldProduct,
		});
	} catch (err) {
		console.log("Error in getOldProducts :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { name, description, category, price, voucher, warranty, seller } =
		req.body;
	const userId = req.userId;
	const id = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		if (!id) {
			return res.status(400).json({
				message: "Somthing went wrong",
			});
		}
		if (seller.toString() !== userId.toString()) {
			return res.status(400).json({
				message: "It not your product",
			});
		}
		const updatedProduct = await Product.findById(id);
		updatedProduct.name = name;
		updatedProduct.description = description;
		updatedProduct.category = category;
		updatedProduct.price = price;
		updatedProduct.voucher = voucher;
		updatedProduct.warranty = warranty;
		updatedProduct.save();
		return res.status(200).json({
			message: "product updated successfully",
		});
	} catch (err) {
		console.log("Error in updateProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const userId = req.userId;

	const { id, seller } = req.params;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		if (!id && !seller) {
			return res.status(400).json({
				message: "Somthing went wrong",
			});
		}
		if (seller.toString() !== userId.toString()) {
			return res.status(400).json({
				message: "It not your product",
			});
		}
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			return res.status(400).json({
				message: "No product found",
			});
		}
		return res.status(200).json({
			message: "product destory",
		});
	} catch (err) {
		console.log("Error in deleteProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
