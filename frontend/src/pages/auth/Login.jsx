import z from "zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader } from "lucide-react";

import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../store/slices/user.js";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { login } from "../../api/auth.js";

const schema = z.object({
	email: z.string().min(1, { message: "Required" }).email(),
	password: z.string().min(1, { message: "Required" }),
});

const Login = () => {
	const [isShowPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(schema) });

	const handleLogin = async (data) => {
		const res = await login(data);

		if (res.status === 200) {
			toast.success(res.data.message);
			dispatch(setUser(res.data.user));
			dispatch(setToken(res.data.token));
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			return navigate("/");
		}
		return toast.error(res.data.message);
	};

	return (
		<form
			className='flex justify-center items-center mx-3 h-screen mt-12'
			onSubmit={handleSubmit(handleLogin)}>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-center text-xl'>
						Welcome Back
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-6'>
						<div>
							{errors.email && (
								<span className='text-destructive text-sm'>
									{errors.email.message}
								</span>
							)}
							<Input
								className='min-w-full'
								type='email'
								placeholder='Enter your email'
								{...register("email")}
							/>
						</div>
						<div className='relative'>
							{errors.password && (
								<span className='text-destructive text-sm absolute -top-5 left-0'>
									{errors.password.message}
								</span>
							)}
							<Input
								type={`${isShowPassword ? "text" : "password"}`}
								placeholder='Enter your password'
								className='min-w-full pr-10'
								{...register("password")}
							/>
							<div
								className='absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-muted-foreground'
								onClick={() =>
									setShowPassword(!isShowPassword)
								}>
								{isShowPassword ? (
									<EyeOff size={18} />
								) : (
									<Eye size={18} />
								)}
							</div>
						</div>
						<Button
							type='submit'
							disabled={isSubmitting}>
							{isSubmitting ? (
								<Loader className='animate-spin' />
							) : (
								"Login"
							)}
						</Button>
					</div>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-muted-foreground text-sm'>
						Don't have an account ?{" "}
						<Link to={"/register"}>
							<Button
								type='submit'
								variant='link'
								className='px-0'>
								create account
							</Button>
						</Link>
					</p>
				</CardFooter>
			</Card>
		</form>
	);
};

export default Login;
