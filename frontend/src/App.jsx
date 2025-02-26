import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ManageProducts from "./pages/ManageProducts";
import AddProductForm from "./pages/AddProductForm";
import EditProduct from "./pages/EditProduct";
import ImageUpload from "./pages/ImageUpload";
import ProductDetails from "./components/ProductDetails";

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
					element: !token? (
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
