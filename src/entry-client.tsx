import { hydrateRoot } from "react-dom/client";

import NotFoundPage from "@/pages/404.page";
import AboutPage from "@/pages/about.page";
import ErrorPage from "@/pages/error.page";
import IndexPage from "@/pages/index.page";

const root = document.getElementById("root");

if (root) {
	const path = window.location.pathname;
	let Page = IndexPage;

	if (path === "/about") {
		Page = AboutPage;
	} else if (path === "/error") {
		Page = ErrorPage;
	} else if (path !== "/" && !path.startsWith("/booking")) {
		Page = NotFoundPage;
	}
	hydrateRoot(root, <Page />);
}
