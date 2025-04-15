import { Button } from "@components/atom/Button.tsx";
import MorphIcon from "@components/atom/MorphIcon.tsx";
import { MoonIconPath, SunIconPath } from "@components/icons/icon-paths.ts";
import { useLocalStorage } from "@hooks/useLocalStorage.ts";
import { useEffect } from "react";

// 기본 컴포넌트 정의
function DarkModeToggle() {
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
}

export default DarkModeToggle;
