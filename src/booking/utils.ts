import { FORM_INPUT_KEY_MAP } from "./constants";

export function extractFormData(formData: FormData): string {
	const currentStep = getStepFromUrl();
	const currentKey = FORM_INPUT_KEY_MAP[currentStep];
	return formData.get(currentKey) as string;
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

// export function calculateEstimatedPrice(
// 	mainCategory: string | null,
// 	subCategory: string | null
// ): number {
// 	const fallback = { subCategories: [], baseMinPrice: 0 };

// 	const category = mainCategory
// 		? SERVICES[mainCategory as keyof typeof SERVICES]
// 		: fallback;

// 	const subCategoryPrice = subCategory
// 			? category.subCategories.find((sub) => sub.id === subCategory)?.basePrice
// 		: undefined;

// 	return subCategoryPrice ?? category.baseMinPrice;
// }
