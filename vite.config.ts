import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteMcp } from "vite-plugin-mcp";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 5173,
		strictPort: false, // Allow fallback if port is in use
	},
	plugins: [
		react(),
		ViteMcp({
			port: 5173,
			printUrl: true,
			updateCursorMcpJson: true,
		}),
		tailwindcss(),
	],
});
