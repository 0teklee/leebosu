import { FormState, FormStateKey } from "./types";

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
};

export const FORM_INPUT_KEY_MAP: FormStateKey[] = [
	"mainCategory",
	"subCategory",
	"date",
	"location",
	"contact",
];

// 예약 프로세스 텍스트
export const BOOKING_TEXT = {
	steps: [
		"대분류 선택",
		"소분류 선택",
		"날짜 선택",
		"지역 입력",
		"연락처 입력",
		"예약 확인",
	],
	locationDescription:
		"경기, 안양 지역 외 예약 시 추가 비용이 발생할 수 있습니다.",
	locationPlaceholder: "안양시 동안구",
	contactPlaceholder: "010-1234-5678",
	// estimatePrefix: "예상 견적: 약 ",
	finalStep: "예약 확인",
	submit: "예약 확정하기",
	confirmation: "예약 내용은 문자 또는 카카오톡으로 전달됩니다.",
	success: "예약이 완료되었습니다!",
	error: "예약 실패 했습니다.",
	errorDescription: "다시 시도해주세요.",
};

export const VALIDATION_ERRORS = [
	"대분류를 선택해주세요.",
	"소분류를 선택해주세요.",
	"날짜를 선택해주세요.",
	"지역을 입력해주세요.",
	"올바른 연락처를 입력해주세요.",
] as const;
