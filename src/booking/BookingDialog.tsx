import { Dialog } from "@/components/atom/Dialog";
import useAnimateDelay from "@/hooks/useAnimateDelay";
import {
	useActionState,
	useEffect,
	useRef,
	useState,
	useTransition,
} from "react";
import { Button } from "../components/atom/Button";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useBooking } from "./BookingContext";
import { INIT_STATE } from "./constants";
import { PriceDisplay } from "./PreviewDisplay";
import { StepIndicator } from "./StepIndicator";
import { stepConfig } from "./steps/config";
import { updateBookingState, validateStep } from "./steps/utils";
import { BOOKING_TEXT } from "./text";
import { StepState } from "./types";
const STORAGE_KEY = "leebosu_booking_form";

export default function BookingDialog() {
	const { isOpen, closeBooking, currentStep, setStep } = useBooking();
	const [storedState, setStoredState] = useLocalStorage(
		STORAGE_KEY,
		INIT_STATE
	);
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<HTMLFormElement>(null);
	const [dir, setDir] = useState<"right" | "left">("right");

	const [state, formAction] = useActionState(
		async (prevState: StepState, formData: FormData) => {
			const validationResult = await validateStep(
				currentStep,
				formData,
				prevState
			);

			if (validationResult.errors) {
				return { ...prevState, validationErrors: validationResult.errors };
			}

			// Step 2: Update state with form data
			const updatedState = await updateBookingState(prevState, formData);

			// Step 3: Handle step navigation and storage
			const isLastStep = currentStep === stepConfig.length - 1;

			if (isLastStep) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setStoredState(INIT_STATE);
				return { ...updatedState, isSubmitted: true };
			}

			const nextState = {
				...updatedState,
				currentStep: currentStep + 1,
				validationErrors: null,
			};

			setStoredState(nextState);
			setStep(currentStep + 1);
			return nextState;
		},
		{ ...storedState, currentStep }
	);

	const [isAnimating, triggerAnim] = useAnimateDelay(300);

	// Handle back navigation
	const handlePrevStep = () => {
		setDir("left");
		triggerAnim(() => {
			setStep(currentStep - 1);
			setStoredState((prev) => ({ ...prev, currentStep: currentStep - 1 }));
		});
	};

	// Handle form submission or next step
	const handleNextStep = () => {
		setDir("right");
		triggerAnim(() => {
			if (currentStep === 0) {
				// animation button move
			}
			if (currentStep < stepConfig.length - 1) {
				startTransition(() => {
					// Collect form data directly from the form
					const formData = new FormData(formRef.current || undefined);

					// Ensure the current step's ID is included
					const currentStepId = stepConfig[currentStep].id;
					if (!formData.has(currentStepId)) {
						const input = formRef.current?.querySelector(
							`[name="${currentStepId}"]`
						);
						if (
							input instanceof HTMLInputElement ||
							input instanceof HTMLSelectElement
						) {
							formData.set(currentStepId, input.value);
						}
					}

					formAction(formData);
				});
			}
		});
	};

	// Sync URL state with form state
	useEffect(() => {
		if (state.currentStep !== currentStep) {
			setStoredState((prev) => ({ ...prev, currentStep }));
		}
	}, [currentStep, state.currentStep, setStoredState]);

	const CurrentStepComponent = stepConfig[currentStep].component;
	const [isFirstStep, isLastStep] = [
		currentStep === 0,
		currentStep === stepConfig.length - 1,
	];

	const slideTransition =
		dir === "right"
			? isAnimating
				? "animate-slide-fade-out-left"
				: "animate-slide-fade-in-right"
			: isAnimating
			? "animate-slide-fade-out-right"
			: "animate-slide-fade-in-left";

	return (
		<form ref={formRef} action={formAction} className="overflow-x-hidden">
			<Dialog isOpen={isOpen} onClose={closeBooking}>
				<Dialog.Header>
					<h2 className="text-xl font-semibold">예약하기</h2>
					<StepIndicator
						steps={stepConfig.map((s) => s.label)}
						currentStep={currentStep}
					/>
				</Dialog.Header>
				<Dialog.Content
					className={`
						relative
						overflow-x-hidden
						anim-duration-300
						anim-fill-both
						anim-timing-ease-in-out
						${slideTransition}
					`}
				>
					<CurrentStepComponent state={state} isPending={isPending} />
					<PriceDisplay currentFormData={state} />
					{state.isSubmitted && (
						<div className="text-center">
							<h3 className="mb-4 text-xl font-semibold text-theme">
								예약이 완료되었습니다!
							</h3>
							<p className="mb-6 text-primary">{BOOKING_TEXT.confirmation}</p>
							<Button onClick={closeBooking}>닫기</Button>
						</div>
					)}
				</Dialog.Content>
				<Dialog.Footer
					className={`
					self-end flex justify-between 
					w-full border-t border-secondary
					`}
				>
					{currentStep > 0 && (
						<Button
							type="button"
							variant="outline"
							onClick={handlePrevStep}
							disabled={isPending}
						>
							이전
						</Button>
					)}

					<Button
						className={`
							anim-duration-300 anim-fill-both anim-timing-ease-in-out
							${isFirstStep ? slideTransition : ""}`}
						type={isLastStep ? "submit" : "button"}
						disabled={Boolean(state.validationErrors) || isPending}
						onClick={isLastStep ? undefined : handleNextStep}
						fullWidth={isFirstStep}
					>
						{isLastStep ? BOOKING_TEXT.submit : "다음"}
					</Button>
				</Dialog.Footer>
			</Dialog>
		</form>
	);
}
