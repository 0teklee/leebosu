import { StepState } from "./types";

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
