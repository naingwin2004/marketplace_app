import { axiosInstance } from "../lib/axiosInstance.js";

export const createProduct = async (data) => {
	try {
		const res = await axiosInstance.post("/products/create-product", data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};
