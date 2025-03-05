import { axiosInstance } from "../lib/axiosInstance.js";

export const getAllProducts = async (page) => {
	try {
		const res = await axiosInstance.get(`/admin/products?page=${page}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};

export const productStatus = async (id, status) => {
	try {
		const res = await axiosInstance.post(
			`/admin/product-status/${id}`,
			{ status },
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

export const getAllUsers = async (page) => {
	try {
		const res = await axiosInstance.get(`/admin/users?page=${page}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};

export const userStatus = async (id, status) => {
	try {
		const res = await axiosInstance.post(
			`/admin/user-status/${id}`,
			{ status },
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