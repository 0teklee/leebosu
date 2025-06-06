import { FormState } from "./types";

export const INIT_STATE: FormState = {
	mainCategory: null,
	subCategory: null,
	date: "",
	location: "",
	contact: "",
	animDirection: 1,
	isSuccess: false,
	isError: false,
	reset_error: false,
	description: "",
	agreement: false,
};

// 예약 프로세스 텍스트
export const BOOKING_TEXT = {
	dialogTitle: "상담 예약하기",
	steps: [
		{
			title: "서비스 선택",
			labels: [
				"어떤 서비스가 필요하신가요?",
				"구체적인 내용을 선택해주세요.",
				"추가 내용이 있으시다면 적어주세요. (선택)",
			],
		},
		{ title: "예약 정보 입력", labels: ["날짜", "위치", "연락처"] },
		{ title: "예약 확인", labels: ["예약 내용"] },
	],
	locationDescription:
		"경기, 안양 지역 외 예약 시 추가 비용이 발생할 수 있습니다.",
	locationPlaceholder: "안양시 동안구",
	contactPlaceholder: "010-1234-5678",
	// estimatePrefix: "예상 견적: 약 ",
	finalStep: "예약 확인",
	submit: "상담 예약하기",
	confirmation: "예약 내용은 문자 또는 카카오톡으로 전달됩니다.",
	confirm_desc: "빠른 시일 내에 연락드리겠습니다.",
	success: "예약이 완료되었습니다",
	error: "예약 실패 했습니다",
	errorDescription: "다시 시도해주세요",
};

export const VALIDATION_ERRORS = {
	mainCategory: "서비스를 선택해주세요.",
	subCategory: "작업 내용을 선택해주세요.",
	date: "시공 날짜를 선택해주세요.",
	location: "지역을 입력해주세요.",
	contact: "올바른 연락처를 입력해주세요.",
} as const;

export const SLIDE_ANIMATION = {
	back: {
		exit: "animate-slide-fade-out-right",
		enter: "animate-slide-fade-in-left",
	},
	forward: {
		exit: "animate-slide-fade-out-left",
		enter: "animate-slide-fade-in-right",
	},
} as const;

export const PRICE_NOTICE = {
	title: "재료비 안내",
	description: "원하시는 재료를 미리 준비해주시면 공임비만 받습니다.",
};
