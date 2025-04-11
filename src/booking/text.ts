import { StepState } from "./types";

// 예약 프로세스 텍스트
export const BOOKING_TEXT = {
	steps: [
		"대분류 선택",
		"소분류 선택",
		"날짜 선택",
		"지역 입력",
		"연락처 입력",
	],
	locationDescription:
		"경기, 안양 지역 외 예약 시 추가 비용이 발생할 수 있습니다.",
	locationPlaceholder: "안양시 동안구",
	contactPlaceholder: "010-1234-5678",
	estimatePrefix: "예상 견적: 약 ",
	submit: "예약 확정하기",
	confirmation: "예약 내용은 문자 또는 카카오톡으로 전달됩니다.",
};

// 서비스 정보 - 각 formdata의 value
export const SERVICES = {
	repair: {
		name: "수리",
		subCategories: [
			{ id: "plumbing", name: "변기 막힘", basePrice: 30000 },
			{ id: "tile", name: "타일 교체", basePrice: 150000 },
			{ id: "door", name: "문짝 수리", basePrice: 50000 },
			{ id: "window", name: "창문 수리", basePrice: 70000 },
		],
	},
	interior: {
		name: "인테리어",
		subCategories: [
			{ id: "wallpaper", name: "도배", basePrice: 200000 },
			{ id: "painting", name: "페인트", basePrice: 180000 },
			{ id: "floor", name: "바닥재 시공", basePrice: 250000 },
		],
	},
};

// 초기 상태 - 각 formdata의 초기값
export const INIT_STATE: StepState = {
	currentStep: 0,
	mainCategory: "",
	subCategory: "",
	date: "",
	location: "",
	contact: "",
	estimatedPrice: 0,
	validationErrors: null,
	lastCompletedStep: -1,
};
