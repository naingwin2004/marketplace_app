import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import AuthProvider from "./lib/AuthProvider"

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Main />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "/login", element: <Login /> },
				{ path: "/register", element: <Register /> },
				{ path: "/profile", element: 
				<AuthProvider><Profile /></AuthProvider> },
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
