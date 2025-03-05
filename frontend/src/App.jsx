import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import Notifications from "./pages/Notifications";
import ManageProducts from "./pages/ManageProducts";
import AddProductForm from "./pages/add/AddProductForm";
import EditProduct from "./pages/edit/EditProduct";
import EditImage from "./pages/edit/EditImage";
import ImageUpload from "./pages/add/ImageUpload";
import ProductDetails from "./components/ProductDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";

import AuthProvider from "./lib/AuthProvider";
import EditProvider from "./lib/EditProvider";
import ImageProvider from "./lib/ImageProvider";

import { useSelector } from "react-redux";

const App = () => {
	const token = useSelector((state) => state.auth.token);
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Main />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: "/login",
					element: !token ? (
						<Login />
					) : (
						<Navigate
							to='/'
							replace
						/>
					),
				},
				{
					path: "/register",
					element: !token ? (
						<Register />
					) : (
						<Navigate
							to='/'
							replace
						/>
					),
				},
				{
					path: "/add-product",
					element: (
						<AuthProvider>
							<AddProductForm />
						</AuthProvider>
					),
				},
				{
					path: "/admin-dashboard",
					element: (
						<AuthProvider>
							<AdminDashboard />
						</AuthProvider>
					),
				},
				{
					path: "/manage-users",
					element: (
						<AuthProvider>
							<ManageUsers />
						</AuthProvider>
					),
				},
				{
					path: "/products",
					element: (
						<AuthProvider>
							<ManageProducts />
						</AuthProvider>
					),
				},
				{
					path: "/notifications",
					element: (
						<AuthProvider>
							<Notifications />
						</AuthProvider>
					),
				},
				{
					path: "/image-upload",
					element: (
						<ImageProvider>
							<ImageUpload />
						</ImageProvider>
					),
				},
				{
					path: "/image-edit",
					element: (
						<EditProvider>
							<EditImage />
						</EditProvider>
					),
				},
				{
					path: "/product/:id",
					element: (
						<AuthProvider>
							<ProductDetails />
						</AuthProvider>
					),
				},
				{
					path: "/edit-product/:id",
					element: (
						<EditProvider>
							<EditProduct />
						</EditProvider>
					),
				},
				{
					path: "/profile",
					element: (
						<AuthProvider>
							<Profile />
						</AuthProvider>
					),
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
