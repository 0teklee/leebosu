import useAnimateDelay from "@/hooks/useAnimateDelay";
import { Button } from "@components/atom/Button";
import { Dialog } from "@components/atom/Dialog";
import { useBooking } from "@hooks/useBooking";
import { useActionState, useRef, useState, useTransition } from "react";
import BookingPreview from "./BookingPreview";
import BookingStepIndicator from "./BookingStepIndicator";
import { BOOKING_TEXT, INIT_STATE } from "./constants";
import StepComplete from "./steps/StepComplete";
import StepContact from "./steps/StepContact";
import StepDate from "./steps/StepDate";
import StepError from "./steps/StepError";
import StepFinal from "./steps/StepFinal";
import StepLocation from "./steps/StepLocation";
import StepMainCategory from "./steps/StepMainCategory";
import StepSubCategory from "./steps/StepSubCategory";
import { FormState } from "./types";
import { extractFormData, getCurrentKey, getStepFromUrl } from "./utils";

export default function BookingDialog() {
	const { closeBooking, setStep } = useBooking();

	const [formState, formAction] = useActionState<FormState, FormData>(
		async (prevState, formData) => {
			try {
				// Check if this is an error reset action
				if (formData.get("reset_error")) {
					return { ...prevState, isError: false, isSuccess: false };
				}

				const direction = formData.get("direction");
				const updateKey = getCurrentKey();
				const updateValue = extractFormData(formData);

				const nextState = {
					...prevState,
					[updateKey]: updateValue,
				};

				if (currentStep === BOOKING_TEXT.steps.length - 1) {
					const response = await fetch("/api/send-sms", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(nextState),
					});

					const result = await response.json();
					return {
						...nextState,
						isSuccess: result.success,
						isError: !result.success,
					};
				}

				if (direction === "next") {
					handleNextStep();
				} else {
					handlePrevStep();
				}

				return { ...nextState, isError: false };
			} catch (error) {
				console.error(error);
				return {
					...prevState,
					isSuccess: false,
					isError: true,
				};
			}
		},
		INIT_STATE
	);

	const { isSuccess, isError } = formState;

	const [isPending, startTransition] = useTransition();
	const [isAnimating, triggerAnim, animDuration] = useAnimateDelay(400);
	const [direction, setDirection] = useState<"prev" | "next">("next");

	const animStyle = `anim-duration-${animDuration} anim-ease-in-out anim-fill-both`;

	const formRef = useRef<HTMLFormElement>(null);

	const isOpen = location.pathname === "/booking";
	const currentStep = getStepFromUrl();

	function handleNextStep(): void {
		setDirection("next");
		triggerAnim(() => {
			startTransition(() => {
				setStep(currentStep + 1);
			});
		});
	}

	function handlePrevStep(): void {
		setDirection("prev");
		triggerAnim(() => {
			startTransition(() => {
				setStep(currentStep - 1);
			});
		});
	}

	function handleErrorStep() {
		triggerAnim(() => {
			startTransition(() => {
				setStep(4);
				const resetFormData = new FormData();
				resetFormData.append("reset_error", "true");
				formAction(resetFormData);
			});
		});
	}

	const [isFirstStep, isLastStep] = [
		currentStep === 0,
		currentStep === BOOKING_TEXT.steps.length - 1,
	];

	// 현재 단계와 이전 단계의 비교로 이동 방향 결정
	const [enteringTransition, exitingTransition] = [
		direction === "prev"
			? "animate-slide-fade-in-left"
			: "animate-slide-fade-in-right",
		direction === "prev"
			? "animate-slide-fade-out-right"
			: "animate-slide-fade-out-left",
	];

	const slideTransition = isAnimating ? exitingTransition : enteringTransition;

	return (
		<Dialog isOpen={isOpen} onClose={closeBooking}>
			<form ref={formRef} action={formAction} className="overflow-x-hidden">
				<Dialog.Header>
					<h2 className="text-xl font-semibold">예약하기</h2>
					<BookingStepIndicator
						steps={BOOKING_TEXT.steps}
						currentStep={currentStep}
					/>
				</Dialog.Header>
				<Dialog.Content
					className={`relative
						${animStyle} anim-duration-400
						${slideTransition}
						`}
				>
					{!isSuccess && !isError && (
						<>
							{currentStep === 0 && (
								<StepMainCategory state={formState} isPending={isPending} />
							)}
							{currentStep === 1 && (
								<StepSubCategory state={formState} isPending={isPending} />
							)}
							{currentStep === 2 && (
								<StepDate state={formState} isPending={isPending} />
							)}
							{currentStep === 3 && (
								<StepLocation state={formState} isPending={isPending} />
							)}
							{currentStep === 4 && (
								<StepContact state={formState} isPending={isPending} />
							)}
							{currentStep === 5 && <StepFinal />}
							<BookingPreview formState={formState} formRef={formRef} />
						</>
					)}
					{isSuccess && <StepComplete />}
					{isError && <StepError />}
				</Dialog.Content>
				<Dialog.Footer className="self-end flex justify-between w-full border-t border-secondary">
					{!isSuccess && !isError && (
						<>
							{currentStep > 0 && (
								<Button
									name="direction"
									value="prev"
									data-direction="backward"
									type="submit"
									variant="outline"
									size="md"
								>
									이전
								</Button>
							)}
							{!isLastStep ? (
								<Button
									variant="primary"
									name="direction"
									value="next"
									data-direction="forward"
									className={`${animStyle} ${
										isFirstStep ? slideTransition : ""
									}`}
									type="submit"
									disabled={isPending}
									fullWidth={isFirstStep}
									size="md"
								>
									다음
								</Button>
							) : (
								<Button
									variant="primary"
									className={`${animStyle}`}
									disabled={isPending}
									type="submit"
									size="md"
								>
									{BOOKING_TEXT.submit}
								</Button>
							)}
						</>
					)}
					{isSuccess && (
						<Button fullWidth type="button" onClick={closeBooking}>
							닫기
						</Button>
					)}
					{isError && (
						<Button
							variant="secondary"
							fullWidth
							type="button"
							onClick={handleErrorStep}
						>
							이전 단계로 돌아가기
						</Button>
					)}
				</Dialog.Footer>
			</form>
		</Dialog>
	);
}
