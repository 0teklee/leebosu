import { Pages } from "vite-plugin-mpa-plus";
export const mpaPlusConfig: Pages = {
	index: {
		filename: "index.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "이보수 - 홈",
			},
		},
	},
	about: {
		filename: "about.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "이보수 소개",
			},
		},
	},
	"404": {
		filename: "404.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "페이지를 찾을 수 없습니다",
			},
		},
	},
	error: {
		filename: "error.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "오류 발생",
			},
		},
	},
};
