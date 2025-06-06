import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import {
	Menu,
	Home,
	Boxes,
	LogIn,
	LogOut,
	UserCog,
	UserPlus,
	BellRing,
	PackagePlus,
	LayoutDashboard,
	Heart,
} from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import { Button } from "../components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";

import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../store/slices/user.js";

const AuthData = [
	{ name: "Login", path: "/login", icon: LogIn },
	{ name: "Register", path: "/register", icon: UserPlus },
];

const NavData = [
	{
		name: "AddProducts",
		path: "add-product",
		icon: PackagePlus,
	},
	{
		name: "Manage Products",
		path: "products",
		icon: Boxes,
	},
	{
		name: "Notifications",
		path: "notifications",
		icon: BellRing,
	},
	{
		name: "Favorite",
		path: "favorite",
		icon: Heart,
	},
	{
		name: "Profile",
		path: "profile",
		icon: UserCog,
	},
];

const AdminNavData = [
	{
		name: "Admin Dashboard",
		path: "admin-dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Manage Users",
		path: "manage-users",
		icon: UserCog,
	},
		{
		name: "Favorite",
		path: "favorite",
		icon: Heart,
	},
	{
		name: "Profile",
		path: "profile",
		icon: UserCog,
	},
];

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);

	const handleLogout = async () => {
		try {
			dispatch(setUser(null));
			dispatch(setToken(null));
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			toast.success("logout successfully");
			navigate("/");
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Sheet>
			<div className='fixed top-0 left-0 w-full bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border-b border-white/20 dark:border-black/20 z-50 '>
				<nav className='w-full mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-12'>
						<div className='flex-shrink-0'>
							<NavLink
								to={"/"}
								className='text-xl font-bold'>
								Name
							</NavLink>
						</div>

						<div className='hidden md:flex gap-3'>
							{!token &&
								AuthData.map((auth, index) => (
									<NavLink
										to={auth.path}
										key={index}>
										{({ isActive }) => (
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant={
																isActive
																	? ""
																	: "ghost"
															}>
															<auth.icon
																size={16}
															/>
															<span className='hidden lg:block'>
																{auth.name}
															</span>
														</Button>
													</TooltipTrigger>

													<TooltipContent className='lg:hidden'>
														<p>{auth.name}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										)}
									</NavLink>
								))}

							{token && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant=''>
											<LayoutDashboard size={16} />
											<span className='hidden lg:block'>
												{user?.role === "admin"
													? "Admin Panel"
													: "User Panel"}
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuLabel>
											{user?.role === "admin"
												? "Admin Panel"
												: "User Panel"}
										</DropdownMenuLabel>
										<DropdownMenuSeparator />

										{user?.role === "admin"
											? AdminNavData.map(
													(navItem, index) => (
														<NavLink
															to={navItem.path}
															key={index}>
															{({ isActive }) => (
																<DropdownMenuItem
																	className={
																		isActive
																			? "bg-black text-white"
																			: ""
																	}>
																	<navItem.icon
																		size={
																			16
																		}
																	/>
																	{
																		navItem.name
																	}
																</DropdownMenuItem>
															)}
														</NavLink>
													),
											  )
											: NavData.map((navItem, index) => (
													<NavLink
														to={navItem.path}
														key={index}>
														{({ isActive }) => (
															<DropdownMenuItem
																className={
																	isActive
																		? "bg-black text-white"
																		: ""
																}>
																<navItem.icon
																	size={16}
																/>
																{navItem.name}
															</DropdownMenuItem>
														)}
													</NavLink>
											  ))}
									</DropdownMenuContent>
								</DropdownMenu>
							)}

							{token && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant='ghost'
												onClick={handleLogout}
												className='justify-start'>
												<LogOut size={16} />
												<span className='hidden lg:block'>
													Logout
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent className='lg:hidden'>
											<p>Logout</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}

							<ModeToggle />
						</div>

						{/* For mobile menu and open sheet */}
						<div className='md:hidden'>
							<SheetTrigger asChild>
								<Button
									variant='ghost'
									size='icon'>
									<Menu size={24} />
								</Button>
							</SheetTrigger>
						</div>
						{/* End */}
					</div>
				</nav>
			</div>

			{/* For mobile view sheet */}
			<SheetContent
				side='left'
				className='flex flex-col gap-2'>
				<SheetHeader className='text-start'>
					<SheetTitle>Name</SheetTitle>
					<div className='flex justify-end'>
						<ModeToggle />
					</div>
					<SheetDescription>Application</SheetDescription>
				</SheetHeader>
				<div className='flex flex-col flex-1 '>
					<NavLink to={"/"}>
						{({ isActive }) => (
							<Button
								variant={isActive ? "" : "ghost"}
								className='justify-start w-full'>
								<Home size={16} />
								Home
							</Button>
						)}
					</NavLink>

					{token &&
						(user?.role === "admin"
							? AdminNavData.map((navItem, index) => (
									<NavLink
										to={navItem.path}
										key={index}>
										{({ isActive }) => (
											<Button
												variant={
													isActive ? "" : "ghost"
												}
												className='justify-start w-full'>
												<navItem.icon size={16} />
												{navItem.name}
											</Button>
										)}
									</NavLink>
							  ))
							: NavData.map((navItem, index) => (
									<NavLink
										to={navItem.path}
										key={index}>
										{({ isActive }) => (
											<Button
												variant={
													isActive ? "" : "ghost"
												}
												className='justify-start w-full'>
												<navItem.icon size={16} />
												{navItem.name}
											</Button>
										)}
									</NavLink>
							  )))}
				</div>
				<div>
					{!token &&
						AuthData.map((auth, index) => (
							<NavLink
								to={auth.path}
								key={index}>
								{({ isActive }) => (
									<Button
										variant={isActive ? "" : "ghost"}
										className='justify-start w-full'>
										<auth.icon size={16} />
										{auth.name}
									</Button>
								)}
							</NavLink>
						))}
					{token && (
						<Button
							variant='ghost'
							onClick={handleLogout}
							className='justify-start w-full'>
							<LogOut size={16} />
							Logout
						</Button>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default Navbar;
