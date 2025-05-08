import SavedProduct from "../models/save.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
export const saveProduct = async (req, res) => {
	const userId = req.userId;
	const id = req.params.id;
	const canSaveProducts = 10;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "Unauthorized User",
			});
		}
		const product = await Product.findById(id);
		if (!product) {
			return res.status(400).json({
				message: "No product found",
			});
		}

		const isExists = await SavedProduct.findOne({
			user: req.userId,
			product: id,
		});
		if (isExists) {
			return res.status(400).json({
				message: "Product was already saved!",
			});
		}

		const savedCount = await SavedProduct.countDocuments({ user: userId });
		if (savedCount >= canSaveProducts) {
			return res.status(400).json({
				message: `You can only save up to ${canSaveProducts} products!`,
			});
		}

		const saveProduct = await SavedProduct.create({
			user: userId,
			product: id,
		});
		return res.status(201).json({
			message: "Product saved",
		});
	} catch (err) {
		console.log("Error in saveProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getSave = async (req, res) => {
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "Unauthorized User",
			});
		}
		const saveProduct = await SavedProduct.find({ user: userId }).select(
			"product product",
		);
		return res.status(200).json({ product: saveProduct });
	} catch (err) {
		console.log("Error in getSave :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getSaveProduct = async (req, res) => {
	const userId = req.userId;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "Unauthorized User",
			});
		}
		const saveProduct = await SavedProduct.find({ user: userId })
			.populate("product")
			.select("product");

		// sort by product.createdAt (descending)
		const sortedProducts = saveProduct.sort((a, b) => {
			return (
				new Date(b.product.createdAt) - new Date(a.product.createdAt)
			);
		});

		return res.status(200).json({ products: sortedProducts });
	} catch (err) {
		console.log("Error in getSaveProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const unSave = async (req, res) => {
	const userId = req.userId;
	const id = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "Unauthorized User" });
		}

		const objectId = new mongoose.Types.ObjectId(id);
		const saveProduct = await SavedProduct.findOne({user:userId, product: objectId });

		if (!saveProduct) {
			return res.status(404).json({ message: "No saved product found!" });
		}

		if (saveProduct.user.toString() !== userId.toString()) {
			return res
				.status(400)
				.json({ message: "This is not your saved product" });
		}

		await saveProduct.deleteOne();

		return res
			.status(200)
			.json({ message: "Product unsaved successfully" });
	} catch (err) {
		console.log("Error in unSave:", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
