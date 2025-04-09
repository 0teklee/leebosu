import express from "express";
import { renderPage } from "vite-plugin-ssr/server";
import { fileURLToPath } from "url";
import path from "path";
import compression from "compression";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, ".."); // Adjust based on your project structure
const isProduction = process.env.NODE_ENV === "production";

async function startServer() {
	const app = express();
	app.use(compression());

	if (isProduction) {
		// Serve static assets in production
		const sirv = (await import("sirv")).default;
		app.use(sirv(`${root}/dist/client`, { dev: false }));
	} else {
		// Use Vite's dev server middleware in development
		const vite = await import("vite");
		const viteDevMiddleware = (
			await vite.createServer({
				root,
				server: { middlewareMode: true },
			})
		).middlewares;
		app.use(viteDevMiddleware);
	}

	// vite-plugin-ssr request handler
	app.get("*", async (req, res, next) => {
		const pageContextInit = {
			urlOriginal: req.originalUrl,
		};
		const pageContext = await renderPage(pageContextInit);
		const { httpResponse } = pageContext;

		if (!httpResponse) {
			return next();
		}

		const { body, statusCode, headers, earlyHints } = httpResponse;

		if (res.writeEarlyHints) {
			res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
		}

		headers.forEach(([name, value]) => res.setHeader(name, value));
		res.status(statusCode);

		// For streaming, pipe the readable stream to the response
		// For non-streaming, send the body directly
		if (typeof body === "string") {
			res.send(body);
		} else {
			// Assuming body is a ReadableStream
			body.pipe(res);
		}
	});

	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});
}

startServer();
