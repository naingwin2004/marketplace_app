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
import ProductDetails from "./components/ProductDetails";

import AuthProvider from "./lib/AuthProvider";
import EditProvider from "./lib/EditProvider";

const App = () => {
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
					element: !localStorage.getItem("token") ? (
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
					element: !localStorage.getItem("token") ? (
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
