import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { PageContextServer } from "vite-plugin-ssr/types";
import App from "./App";
import "./global.css";

export function render(pageContext: PageContextServer) {
	const { urlPathname } = pageContext;

	try {
		const html = ReactDOMServer.renderToString(
			<React.StrictMode>
				<StaticRouter location={urlPathname}>
					<App />
				</StaticRouter>
			</React.StrictMode>
		);

		return { html };
	} catch (error) {
		console.error("Server-side rendering failed:", error);
		// Return a minimal error page
		return {
			html: `<div>Something went wrong. Please try again later.</div>`,
		};
	}
}
