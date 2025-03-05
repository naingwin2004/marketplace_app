import User from "../models/user.model.js";
import Product from "../models/product.model.js";

import cloudinary from "../middleware/cloudinary.js";
export const createProduct = async (req, res) => {
	const { name, description, category, price, voucher, warranty } = req.body;
	const coverImage = req.files["coverImage"]
		? req.files["coverImage"][0]
		: null;
	const arrayImages = req.files["arrayImages"] || [];
	const userId = req.userId;

	if (!name && !description && !category) {
		return res.status(400).json({
			message: "name,description and category are require!",
		});
	}

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "Unauthorized User",
			});
		}
		if (user.role === "admin") {
			return res.status(400).json({
				message: "Bro you are admin!!!",
			});
		}
		let secureUrl_cover;
		let secureUrl_array = [];
		if (coverImage) {
			const uploadResponse = await cloudinary.uploader.upload(
				coverImage.path,
			);
			secureUrl_cover = {
				url: uploadResponse.secure_url,
				public_id: uploadResponse.public_id,
			};
		}
		if (arrayImages.length > 0) {
			for (const img of arrayImages) {
				const uploadResponse = await cloudinary.uploader.upload(
					img.path,
				);
				secureUrl_array.push({
					url: uploadResponse.secure_url,
					public_id: uploadResponse.public_id,
				});
			}
		}
		const newProduct = await Product.create({
			name,
			description,
			category,
			price,
			voucher,
			warranty,
			coverImage: secureUrl_cover,
			arrayImages: secureUrl_array,
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
	const page = +req.query.page || 1;
	const limit = 10;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		if (user.role === "admin") {
			return res.status(400).json({
				message: "Bro you are admin!!!",
			});
		}
		const totalProducts = await Product.find().countDocuments();
		const totalPages = Math.ceil(totalProducts / limit);
		const products = await Product.find({ seller: userId })
			.sort({
				createdAt: -1,
			})
			.skip((page - 1) * limit)
			.limit(limit);
		return res.status(200).json({
			products,
			totalPages,
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
		if (user.role === "admin") {
			return res.status(400).json({
				message: "Bro you are admin!!!",
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
	const {
		name,
		description,
		category,
		price,
		voucher,
		warranty,
		seller,
		id,
	} = req.body;
	const coverImage = req.files["coverImage"]
		? req.files["coverImage"][0]
		: null;
	const arrayImages = req.files["arrayImages"] || [];
	const userId = req.userId;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}
		if (user.role === "admin") {
			return res.status(400).json({
				message: "Bro you are admin!!!",
			});
		}
		if (!id) {
			return res.status(400).json({ message: "Something went wrong" });
		}

		if (seller.toString() !== userId.toString()) {
			return res.status(400).json({ message: "It is not your product" });
		}

		const updatedProduct = await Product.findById(id);
		if (!updatedProduct) {
			return res.status(404).json({ message: "Product not found" });
		}

		const existingCoverImage = updatedProduct.coverImage || null;
		if (coverImage) {
			if (existingCoverImage?.url) {
				return res
					.status(400)
					.json({ message: "Cover image already exists" });
			}
			const uploadResponse = await cloudinary.uploader.upload(
				coverImage.path,
			);
			updatedProduct.coverImage = {
				url: uploadResponse.secure_url,
				public_id: uploadResponse.public_id,
			};
		}

		const existingArrayImages = updatedProduct.arrayImages || [];
		if (arrayImages.length > 0) {
			if (existingArrayImages.length + arrayImages.length > 6) {
				return res.status(400).json({
					message: "Maximum of 6 images allowed for product gallery",
				});
			}

			for (const img of arrayImages) {
				const uploadResponse = await cloudinary.uploader.upload(
					img.path,
				);
				existingArrayImages.push({
					url: uploadResponse.secure_url,
					public_id: uploadResponse.public_id,
				});
			}
			updatedProduct.arrayImages = existingArrayImages;
		}

		updatedProduct.name = name;
		updatedProduct.description = description;
		updatedProduct.category = category;
		updatedProduct.price = price;
		updatedProduct.voucher = voucher;
		updatedProduct.warranty = warranty;

		await updatedProduct.save();
		return res.status(200).json({
			message: "Product updated successfully",
		});
	} catch (err) {
		console.log("Error in updateProduct:", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const deleteImage = async (req, res) => {
	const userId = req.userId;
	const { id, seller, public_id } = req.params;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		if (user.role === "admin") {
			return res.status(400).json({
				message: "Bro you are admin!!!",
			});
		}

		if (!id || !seller) {
			return res.status(400).json({
				message: "Something went wrong",
			});
		}

		if (seller.toString() !== userId.toString()) {
			return res.status(400).json({
				message: "It's not your product",
			});
		}

		const product = await Product.findById(id);
		if (!product) {
			return res.status(400).json({
				message: "No product found",
			});
		}

		if (product.coverImage && product.coverImage.public_id === public_id) {
			await cloudinary.uploader.destroy(public_id);
			product.coverImage = undefined;
		}

		const exists = product.arrayImages.some(
			(image) => image.public_id === public_id,
		);
		if (product.arrayImages.length > 0 && exists) {
			await cloudinary.uploader.destroy(public_id);
			product.arrayImages = product.arrayImages.filter(
				(image) => image.public_id !== public_id,
			);
		}

		await product.save();

		return res.status(200).json({
			message: "Image deleted successfully",
		});
	} catch (err) {
		console.log("Error in deleteImage:", err.message);
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
		if (user.role === "admin") {
			return res.status(400).json({
				message: "Bro you are admin!!!",
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
		if (product.coverImage && product.coverImage.public_id) {
			await cloudinary.uploader.destroy(product.coverImage.public_id);
		}
		if (product.arrayImages && product.arrayImages.length > 0) {
			for (const img of product.arrayImages) {
				await cloudinary.uploader.destroy(img.public_id);
			}
		}
		return res.status(200).json({
			message: "product destroy",
		});
	} catch (err) {
		console.log("Error in deleteProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
