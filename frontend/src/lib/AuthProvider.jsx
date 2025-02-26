import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { checkAuth } from "../api/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../store/slices/user";

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const getCurrentUser = async () => {
		setLoading(true);
		const response = await checkAuth();
		if (response.status !== 200) {
			localStorage.removeItem("token");
			dispatch(setToken(null));
			localStorage.removeItem("user");
			dispatch(setUser(null));
			toast.error(response.data?.message || "Authentication failed!");
			navigate("/");
		}
		setLoading(false);
	};

	useEffect(() => {
		getCurrentUser();
	}, []);

	if (loading) {
		return (
			<section className='flex justify-center items-center h-screen'>
				<LoaderCircle className='w-20 h-20 animate-spin' />
			</section>
		);
	}

	return <section>{children}</section>;
};

export default AuthProvider;
