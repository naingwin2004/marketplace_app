import toast from "react-hot-toast";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { ThemeProvider } from "../components/theme-provider";

const Main = () => {


	return (
		<ThemeProvider
			defaultTheme='light'
			storageKey='vite-ui-theme'>
			<div>
				<Navbar />
				<main className='flex flex-col h-screen'>
					{/* don't forgot every route mt-12 => fix navbar */}
					<Outlet />
				</main>
			</div>
		</ThemeProvider>
	);
};

export default Main;
