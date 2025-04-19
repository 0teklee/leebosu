import { hydrateRoot } from "react-dom/client";

import NotFoundPage from "@/domains/fallbacks/404.page";
import AboutPage from "@/domains/about/page";
import ErrorPage from "@/domains/fallbacks/error.page";
import MainPage from "@/domains/main/page";

const root = document.getElementById("root");

if (root) {
	const path = window.location.pathname;
	let Page = MainPage;

	if (path === "/about") {
		Page = AboutPage;
	} else if (path === "/error") {
		Page = ErrorPage;
	} else if (path !== "/" && !path.startsWith("/booking")) {
		Page = NotFoundPage;
	}
	hydrateRoot(root, <Page />);
}
