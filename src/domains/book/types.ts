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
}

export const FORM_FIELDS_MAP: FormStateKey[] = [
	"mainCategory",
	"subCategory",
	"date",
	"location",
	"contact",
	"animDirection",
] as const;

export const FORM_FIELDS_STEP_MAP = [
	["mainCategory", "subCategory"],
	["date", "location", "contact"],
	[],
] as const;

export type FormStateKey = keyof FormState;
export type FormStateValue = FormState[FormStateKey];

export type TypedFormData = Omit<FormData, "get"> & {
	get(key: FormStateKey): string | null;
	has(key: FormStateKey): boolean;
};

export interface StepProps {
	state: FormState;
	formAction?: (formData: FormData) => Promise<void> | void;
	isPending: boolean;
}
