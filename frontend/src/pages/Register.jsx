import z from "zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { setUser, setToken } from "../store/slices/user.js";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { registerAcc } from "../api/auth.js";

const schema = z.object({
	username: z
		.string()
		.min(1, { message: "Required" })
		.max(30, { message: "Only 30 characters" }),
	email: z.string().min(1, { message: "Required" }).email(),
	password: z
		.string()
		.min(6, { message: "password must be at least 6 characters long" }),
});

const Register = () => {
	const [isShowPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: zodResolver(schema) });

	const handleRegister = async (data) => {
		const res = await registerAcc(data);

		if (res.status === 201) {
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
			className='flex justify-center items-center m-3 h-screen mt-12'
			onSubmit={handleSubmit(handleRegister)}>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-center text-xl'>
						Welcome to Name
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-6'>
						<div className='flex flex-col'>
							{errors.username && (
								<span className='text-destructive text-sm'>
									{errors.username.message}
								</span>
							)}
							<Input
								type='text'
								placeholder='Username'
								{...register("username")}
							/>
							<div className={`${errors.email ? "mt3" : "mt-6"}`}>
								{errors.email && (
									<span className='text-destructive text-sm'>
										{errors.email.message}
									</span>
								)}
								<Input
									type='email'
									placeholder='Email'
									{...register("email")}
								/>
							</div>
						</div>
						<div className='relative'>
							{errors.password && (
								<span className='text-destructive text-sm absolute -top-5 left-0'>
									{errors.password.message}
								</span>
							)}
							<Input
								type={`${isShowPassword ? "text" : "password"}`}
								placeholder='Password'
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
						<Button type='submit'>Signup</Button>
					</div>
				</CardContent>
				<CardFooter className='flex justify-center'>
					<p className='text-muted-foreground text-sm'>
						account already exists ?
						<Link to={"/login"}>
							<Button
								variant='link'
								className='px-0'>
								login here
							</Button>
						</Link>
					</p>
				</CardFooter>
			</Card>
		</form>
	);
};

export default Register;
