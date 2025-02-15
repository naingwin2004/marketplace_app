import React, { useEffect } from "react";
import { checkAuth } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const getCurrentUser = async () => {
		const response = await checkAuth();
		if (response.status === 200) {
			//code
			toast.success(response.data.message)
		} else {
			localStorage.removeItem("token");
			toast.error(response.data.message);
			navigate("/");
		}
	};

	useEffect((_) => {
		getCurrentUser();
	}, []);

	return <section>{children}</section>;
};

export default AuthProvider;
