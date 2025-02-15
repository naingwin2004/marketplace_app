import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "../components/theme-provider";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			variant='outline'
			size='icon'
			onClick={toggleTheme}
			className='relative flex items-center justify-center'>
			<Sun
				className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${
					theme === "dark"
						? "opacity-0 scale-75 rotate-180"
						: "opacity-100 scale-100 rotate-0"
				}`}
			/>
			<Moon
				className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-300 ease-in-out ${
					theme === "dark"
						? "opacity-100 scale-100 rotate-0"
						: "opacity-0 scale-75 rotate-180"
				}`}
			/>
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
