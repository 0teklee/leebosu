import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TransitionProvider } from "./hooks/useAppTransition";
import "./global.css";

// Client-side render
if (typeof window !== "undefined") {
	const root = document.getElementById("root");
	if (!root) {
		throw new Error("Root element not found");
	}

	// Use hydrateRoot for SSR
	ReactDOM.hydrateRoot(
		root,
		<React.StrictMode>
			<BrowserRouter>
				<TransitionProvider>
					<App />
				</TransitionProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
}
