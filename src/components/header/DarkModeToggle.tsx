import { MoonIconPath, SunIconPath } from "@/utils/icon-paths.ts";
import React, { useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
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
		<button
			onClick={toggleDarkMode}
			className="p-2 rounded bg-background text-primary transition-colors"
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
		>
			<MorphIcon
				from={MoonIconPath}
				to={SunIconPath}
				isOpen={isDarkMode}
				duration={400}
				className="stroke-2 w-6 h-6"
			/>
		</button>
	);
};

export default DarkModeToggle;
