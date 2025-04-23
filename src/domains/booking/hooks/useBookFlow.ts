import { BOOKING_TEXT } from "../constants";
import { getStepFromUrl } from "../utils";

export default function useBookFlow() {
	const [currentStep, lastStep] = [
		getStepFromUrl(),
		BOOKING_TEXT.steps.length - 1,
	];

	return {
		currentStep,
		isFirstStep: currentStep === 0,
		isLastStep: currentStep === lastStep,
		lastStep,
		steps: BOOKING_TEXT.steps,
	};
}
