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
		  message:"product created successfully",
		  product: newProduct
		})
	} catch (err) {
		console.log("Error in createProduct :", err.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
