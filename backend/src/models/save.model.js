import mongoose from "mongoose";

const savedProductSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
});

const SavedProduct = mongoose.model("SavedProduct", savedProductSchema);

export default SavedProduct;
