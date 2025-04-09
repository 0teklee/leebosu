import { useState } from "react";
import { useFormState, BookingForm } from "./useFormState";


export function useStepNavigation() {
	const { form } = useFormState();
	const [currentStep, setCurrentStep] = useState(0);

	// Form validation by step
	const isStepValid = (step: number, formData: BookingForm): boolean => {
		switch (step) {
			case 0: // Main category
				return !!formData.mainCategory;
			case 1: // Sub category
				return !!formData.subCategory;
			case 2: // Date
				return !!formData.date;
			case 3: // Location
				return !!formData.location;
			case 4: // Contact
				return (
					!!formData.contact && /^\d{3}-\d{3,4}-\d{4}$/.test(formData.contact)
				);
			default:
				return false;
		}
	};

	const canGoNext = isStepValid(currentStep, form);

	const goToNextStep = () => {
		if (canGoNext && currentStep < 4) {
			setCurrentStep(currentStep + 1);
		}
	};

	const goToPrevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return {
		currentStep,
		canGoNext,
		goToNextStep,
		goToPrevStep,
		setStep: setCurrentStep,
	};
}
