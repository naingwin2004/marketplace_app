import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { checkAuth } from "../api/auth.js";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../store/slices/user";

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	

	const getCurrentUser = async () => {
		const response = await checkAuth();
		if (response.status === 200) {
			//code
			toast.success(response.data.message);
		} else {
			localStorage.removeItem("token");
			dispatch(setToken(null))
			localStorage.removeItem("user");
			dispatch(setUser(null))
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
