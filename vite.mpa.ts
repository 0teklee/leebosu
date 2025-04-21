import { Pages } from "vite-plugin-mpa-plus";
import {
	AboutMetadata,
	ErrorMetadata,
	MainMetadata,
	NotFoundMetadata,
} from "./vite.meta";

export const mpaPlusConfig: Pages = {
	index: {
		filename: "index.html",
		template: "public/index.html",
		inject: {
			data: MainMetadata,
		},
	},
	about: {
		filename: "about.html",
		template: "public/index.html",
		inject: {
			data: AboutMetadata,
		},
	},
	notFound: {
		filename: "404.html",
		template: "public/index.html",
		inject: {
			data: NotFoundMetadata,
		},
	},
	error: {
		filename: "error.html",
		template: "public/index.html",
		inject: {
			data: ErrorMetadata,
		},
	},
};
