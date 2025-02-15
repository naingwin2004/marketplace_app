import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

// Request interceptor to add the token to every request
/*
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
); */
