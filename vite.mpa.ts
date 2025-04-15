import { Pages } from "vite-plugin-mpa-plus";
export const mpaPlusConfig: Pages = {
	index: {
		filename: "index.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "LEEBOSU - 안양 집수리",
				description: "안양 지역 집수리 전문 업체, 이보수입니다.",
			},
		},
	},
	about: {
		filename: "about.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "LEEBOSU - 안양 지역 집수리",
				description: "안양 지역 집수리 전문 업체, 이보수입니다.",
			},
		},
	},
	notFound: {
		filename: "404.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "LEEBOSU",
				description: "페이지를 찾을 수 없습니다.",
			},
		},
	},
	error: {
		filename: "error.html",
		template: "public/index.html",
		inject: {
			data: {
				title: "LEEBOSU",
				description: "오류가 발생했습니다.",
			},
		},
	},
};
