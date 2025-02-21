import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { checkAuth } from "../api/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../store/slices/user";

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getCurrentUser = async () => {
		const response = await checkAuth();
		if (response.status === 200) {
			//code
			return toast.success(response.data.message);
		}
		localStorage.removeItem("token");
		dispatch(setToken(null));
		localStorage.removeItem("user");
		dispatch(setUser(null));
		toast.error(response.data.message);
		return navigate("/");
	};

	useEffect(
		(_) => {
			getCurrentUser();
		},
		[getCurrentUser],
	);

	return <section>{children}</section>;
};

export default AuthProvider;
