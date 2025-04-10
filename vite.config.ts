import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { ViteMcp } from "vite-plugin-mcp";

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 5173,
		strictPort: false, // Allow fallback if port is in use
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@types": path.resolve(__dirname, "./src/types"),
		},
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
