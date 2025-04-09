import React, { useEffect, useState } from "react";

const DarkModeToggle: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		// 1. Check localStorage
		const storedPreference = localStorage.getItem("darkMode");
		if (storedPreference !== null) {
			return JSON.parse(storedPreference);
		}
		// 2. Check system preference
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return true;
		}
		// 3. Default to light mode
		return false;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		if (isDarkMode) {
			root.style.setProperty("color-scheme", "dark");
		} else {
			root.style.setProperty("color-scheme", "light");
		}
		// Persist preference to localStorage
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
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
			className="p-2 rounded bg-background text-text-primary transition-colors"
			aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDarkMode ? "🌞" : "🌙"}
		</button>
	);
};

export default DarkModeToggle;
