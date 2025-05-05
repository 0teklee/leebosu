// 서비스 정보 - 각 formdata의 value
export const SERVICES = {
	bathroom: {
		name: "화장실",
		subCategories: [
			"세면대 수리/교체",
			"수도꼭지 수리/교체",
			"변기 수리/교체 (막힘 포함)",
			"타일 수리/교체",
			"샤워기 수리/교체",
			"하수구 막힘",
			"기타",
		],
		material: [
			["대림", 80000],
			["비메이커", 60000],
		],
		custom: true,
	},
	electric: {
		name: "전기",
		subCategories: ["조명 수리/교체", "콘센트 수리/교체", "기타"],
		material: [],
		custom: true,
	},
	boiler: {
		name: "난방/누수",
		subCategories: ["바닥 난방/누수 수리 ", "상하수도 누수 수리", "기타"],
		material: [],
		custom: false,
	},
	repair: {
		name: "집수리",
		subCategories: ["문 수리/교체", "창문 수리/교체", "바닥재 시공", "기타"],
		material: [
			["브랜드와 제품 종류에 따라 재료 가격이 다를 수 있습니다.", null],
		],
		custom: true,
	},
} as const;

export type MainCategoryKey = keyof typeof SERVICES;
export type SubCategoryKey =
	(typeof SERVICES)[MainCategoryKey]["subCategories"][number];
