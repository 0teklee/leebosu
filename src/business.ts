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

export const BUSINESS_NUMBER = "123-20-46160";

export const PROTECTION_AGREEMENT = {
	title: "개인정보 수집 및 이용 동의서",
	label: "개인정보 처리 동의 여부",
	description: "동의 내용을 확인하고 동의 버튼을 클릭해주세요.",
	items: [
		{
			title: "수집 항목",
			description: "주소, 전화번호",
		},
		{
			title: "수집·이용 목적",
			description: "사용자가 입력한 전화번호로 상담 안내 전화를 드리기 위함",
		},
		{
			title: "보유 및 이용 기간",
			description: "SMS 발송 즉시 폐기하며 서버에 저장하지 않습니다.",
		},
		{
			title: "제3자 제공",
			description: "없음",
		},
		{
			title: "동의 거부 권리 및 불이익 안내",
			description:
				"귀하는 개인정보 수집·이용에 동의하지 않을 권리가 있으며, 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.",
		},
		{
			title: "개인정보 처리자 정보",
			description: `사업자명:리종합보수 \n 
					사업자등록번호: ${BUSINESS_NUMBER} \n 
					이메일: contact@leebosu.com`,
		},
	],
	confirm: "위 내용을 충분히 이해했으며 동의합니다.",
} as const;
