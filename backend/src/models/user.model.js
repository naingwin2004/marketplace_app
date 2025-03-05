import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		status: {
			type: String,
			enum: ["banned", "active"],
			default: "active",
		},
	},
	{ timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
