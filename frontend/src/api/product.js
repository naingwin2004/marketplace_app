import { axiosInstance } from "../lib/axiosInstance.js";

import { useParams } from "react-router-dom";

export const createProduct = async (data) => {
	try {
		const res = await axiosInstance.post("/create-product", data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};

export const getallProducts = async () => {
	try {
		const res = await axiosInstance.get("/getall-products", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};

export const getOldProduct = async (id) => {
	try {
		const res = await axiosInstance.get(`/getold-product/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};

export const updateProduct = async (data) => {
	const id = data._id;
	try {
		const res = await axiosInstance.post(`/edit-product/${id}`, data, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};

export const deleteProduct = async (id, seller) => {
	console.log("deleteProduct", id);
	console.log("deleteProduct seller ", seller);
	try {
		const res = await axiosInstance.delete(
			`/delete-product/${id}/${seller}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			},
		);
		return res;
	} catch (err) {
		return err.response;
	}
};
