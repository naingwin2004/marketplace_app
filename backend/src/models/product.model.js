import mongoose from "mongoose";

const t = {
	category: null,
	description: null,
	name: null,
	price: 0,
	voucher: false,
	warranty: false,
};
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: [
				"electronics",
				"clothing",
				"home",
				"sports",
				"toys",
				"beauty",
				"books",
			],
		},
		price: {
			type: Number,
			required: true,
		},
		voucher: {
			type: Boolean,
			default: false,
		},
		warranty: {
			type: Boolean,
			default: false,
		},
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "active"],
			default:"pending"
		},
	},
	{
		timestamps: true,
	},
);

const Product = mongoose.model("Product", productSchema);

export default Product;
