import { MainCategoryKey, SubCategoryKey } from "@/business";

export const ANIM_DIRECTION = [-1, 1] as const;
export const [STEP_BACK, STEP_FORWARD] = ANIM_DIRECTION;
export type TAnimDirection = (typeof ANIM_DIRECTION)[number];

export interface FormState {
	mainCategory: MainCategoryKey | null;
	subCategory: SubCategoryKey | null;
	date: string;
	location: string;
	contact: string;
	lastSaved?: string;
	isSuccess: boolean;
	isError: boolean;
	animDirection: TAnimDirection; // -1: back, 1: forward
	reset_error: boolean;
	description?: string;
	agreement: boolean;
}
/** @desc FormState 키 타입
 *  - 폼 API 데이터: `mainCategory`, `subCategory`, `date`, `location`, `contact`, `description`
 *  - 폼 UI 상태 관련(http, animation, 동의): `isSuccess`, `isError`, `reset_error`, `animDirection`, `agreement`
 */
export type FormStateKey = keyof FormState;

/** @desc FormState 값 타입 */
export type FormStateValue = FormState[FormStateKey];

/**
 * @desc 폼 필드 그룹 맵 - 다음 페이지 이동 시 required 필드 검증 시 사용
 */
export const FORM_FIELDS_STEP_MAP = [
	["mainCategory", "subCategory"],
	["date", "location", "contact"],
	[],
] as const;
