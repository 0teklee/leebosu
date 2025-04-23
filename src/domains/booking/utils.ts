import { FORM_INPUT_KEY_MAP } from "./constants";
import { FormState } from "./types";

export function extractFormData(formData: FormData): string {
	const currentStep = getStepFromUrl();
	const currentKey = FORM_INPUT_KEY_MAP[currentStep];
	return formData.get(currentKey) as string;
}

export function setFormData(
	key: keyof FormState,
	value: FormState[keyof FormState]
) {
	const formData = new FormData();
	formData.append(key, value as string);
	return formData;
}

export function extractFormDataAll(formData: FormData): Record<string, string> {
	const entries = Object.fromEntries(formData.entries());
	return entries as Record<string, string>;
}

export function getStepFromUrl() {
	const stepParam = new URLSearchParams(location.search).get("step");
	return Number(stepParam) || 0;
}

export function getCurrentKey() {
	const currentStep = getStepFromUrl();
	return FORM_INPUT_KEY_MAP[currentStep];
}

export function getPreviousStepFromHistory(): number | undefined {
	if (typeof window !== "undefined" && window.history?.state) {
		return window.history.state.previousStep as number | undefined;
	}
	return undefined;
}

/**
 * @desc 예약 가격 계산 함수
 * @param mainCategory - 메인 카테고리
 * @param subCategory - 서브 카테고리
 * @returns 예약 가격
 * @todo 예상 가격 주석처리 (서비스 정책 변경) 
	 export function calculateEstimatedPrice(
	 	mainCategory: string | null,
	 	subCategory: string | null
	 ): number {
	 	const fallback = { subCategories: [], baseMinPrice: 0 };	
	 	const category = mainCategory
	 		? SERVICES[mainCategory as keyof typeof SERVICES]
	 		: fallback;	
	 	const subCategoryPrice = subCategory
	 			? category.subCategories.find((sub) => sub.id === subCategory)?.basePrice
		: undefined;
	return subCategoryPrice ?? category.baseMinPrice;
}
*/
