import { useBooking } from "@hooks/useBooking";
import { BOOKING_TEXT } from "../constants";
import { getStepFromUrl } from "../utils";

export default function useBookFlow() {
	const { closeBooking, setStep, isBookingOpen } = useBooking();
	const currentStep = getStepFromUrl();
	const lastStep = BOOKING_TEXT.steps.length - 1;

	return {
		isOpen: isBookingOpen,
		currentStep,
		isFirstStep: currentStep === 0,
		isLastStep: currentStep === lastStep,
        lastStep,
		go: (dir: -1 | 1) => setStep(currentStep + dir),
		close: closeBooking,
		steps: BOOKING_TEXT.steps,
	};
}
