import { MoonIconPath, SunIconPath } from "@/utils/icon-paths.ts";
import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import { Button } from "../atom/Button.tsx";
import MorphIcon from "../atom/MorphIcon.tsx";

const DarkModeToggle: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", false);

	useEffect(() => {
		const root = document.documentElement;
		if (isDarkMode) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [isDarkMode]);

	// Optional: Listen for system preference changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (e: MediaQueryListEvent) => {
			// Only update if no explicit preference is stored
			if (localStorage.getItem("darkMode") === null) {
				setIsDarkMode(e.matches);
			}
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<Button
			variant="ghost"
			onClick={toggleDarkMode}
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
			className="dark:hover:text-orange-300 hover:text-theme transition-colors duration-400"
		>
			<MorphIcon
				from={MoonIconPath}
				to={SunIconPath}
				isOpen={isDarkMode}
				duration={500}
				className="stroke-2 w-6 h-6"
			/>
		</Button>
	);
};

export default DarkModeToggle;
