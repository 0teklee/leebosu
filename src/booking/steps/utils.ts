import { StepState } from "../types";
import { stepConfig } from "./config";

type ValidationResult = {
	errors?: Record<string, string>;
};

export async function validateStep(
	currentStep: number,
	formData: FormData,
	prevState: StepState
): Promise<ValidationResult> {
	const stepValidation = stepConfig[currentStep];

	try {
		// Merge previous state with current form data for validation
		const mergedFormData = new FormData();
		Object.entries(prevState).forEach(([key, value]) => {
			if (typeof value === "string") {
				mergedFormData.set(key, value);
			}
		});
		formData.forEach((value, key) => {
			mergedFormData.set(key, value);
		});

		const isValid = await stepValidation.validate(mergedFormData);

		if (!isValid) {
			return {
				errors: {
					[stepValidation.id]: "필수 입력 항목입니다.",
				},
			};
		}
		return {};
	} catch (error) {
		console.error("Validation failed:", error);
		return {
			errors: {
				[stepValidation.id]: "처리 중 오류가 발생했습니다.",
			},
		};
	}
}

export async function updateBookingState(
	prevState: StepState,
	formData: FormData
): Promise<StepState> {
	// Convert FormData to object while preserving types
	const formDataObj: Partial<StepState> = {};
	formData.forEach((value, key) => {
		// Type-safe way to update the state object
		switch (key) {
			case "estimatedPrice":
				formDataObj.estimatedPrice = Number(value);
				break;
			case "mainCategory":
				formDataObj.mainCategory = value.toString();
				break;
			case "subCategory":
				formDataObj.subCategory = value.toString();
				break;
			case "date":
				formDataObj.date = value.toString();
				break;
			case "location":
				formDataObj.location = value.toString();
				break;
			case "contact":
				formDataObj.contact = value.toString();
				break;
		}
	});

	// Ensure we keep the current step and last completed step
	return {
		...prevState,
		...formDataObj,
		lastCompletedStep: Math.max(
			prevState.lastCompletedStep,
			prevState.currentStep
		),
		lastSaved: new Date().toISOString(),
	};
}
