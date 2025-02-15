import { axiosInstance } from "../lib/axiosInstance.js";

export const registerAcc = async (data) => {
	try {
		const res = await axiosInstance.post("/auth/register", data);
		return res;
	} catch (err) {
		return err.response;
	}
};

export const login = async (data) => {
	try {
		const res = await axiosInstance.post("/auth/login", data);
		return res;
	} catch (err) {
		return err.response;
	}
};

export const checkAuth = async () => {
	try {
		const res = await axiosInstance.get("/auth/checkAuth", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return res;
	} catch (err) {
		return err.response;
	}
};
