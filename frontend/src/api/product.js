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

export const getallProducts = async (page) => {
	try {
		const res = await axiosInstance.get(`/getall-products?page=${page}`, {
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

export const updateProduct = async (formData) => {
	try {
		const res = await axiosInstance.post(`/edit-product`, formData, {
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
	try {
		const res = await axiosInstance.delete(
			`/delete-product/${id}/seller/${seller}`,
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

export const deleteImage = async (id, seller, public_id) => {
	try {
		const res = await axiosInstance.delete(
			`/delete-image/${id}/seller/${seller}/image-id/${public_id}`,

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
