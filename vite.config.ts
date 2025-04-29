import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import mpaPlus from "vite-plugin-mpa-plus";
import { mpaPlusConfig } from "./vite.mpa";
export default defineConfig({
	base: "./",
	build: {
		outDir: "dist",
		emptyOutDir: true,
		dynamicImportVarsOptions: {
			warnOnError: true,
		},
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "src/entry-client.tsx"),
			},
			output: {
				inlineDynamicImports: false,
				dynamicImportInCjs: true,
				entryFileNames: "assets/main.js",
				chunkFileNames: "assets/main.js",
				assetFileNames(chunkInfo) {
					if (chunkInfo.type === "asset") {
						const hasCSS =
							chunkInfo.name?.endsWith(".css") ||
							chunkInfo.names?.some((name) => name.endsWith(".css")) ||
							false;
						if (hasCSS) {
							return "assets/global.css";
						}
					}
					return `assets/main.js`;
				},
				manualChunks() {
					return "assets/main.js";
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@atoms": path.resolve(__dirname, "./src/components/atom"),
			"@layout": path.resolve(__dirname, "./src/components/layout"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@server": path.resolve(__dirname, "./server"),
		},
		external: ["@server", "@server/*", "functions/**", "functions"],
	},
	plugins: [
		react(),
		tailwindcss(),
		mpaPlus({
			entry: "src/entry-client.tsx",
			pages: mpaPlusConfig,
		}),
	],
	optimizeDeps: {
		include: ["flubber"],
	},
});
