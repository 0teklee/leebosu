import useAnimateDelay from "@/hooks/useAnimateDelay";
import { Button } from "@components/atom/Button";
import { Dialog } from "@components/atom/Dialog";
import { useBooking } from "@hooks/useBooking";
import clsx from "clsx";
import { useRef } from "react";
import BookingPreview from "./BookingPreview";
import BookingStepIndicator from "./BookingStepIndicator";
import { BOOKING_TEXT } from "./constants";
import { useBookFlow } from "./hooks/useBookFlow";
import useBookFormAction from "./hooks/useBookFormAction";
import StepComplete from "./steps/StepComplete";
import StepContact from "./steps/StepContact";
import StepDate from "./steps/StepDate";
import StepError from "./steps/StepError";
import StepFinal from "./steps/StepFinal";
import StepLocation from "./steps/StepLocation";
import StepMainCategory from "./steps/StepMainCategory";
import StepSubCategory from "./steps/StepSubCategory";

export default function BookingDialog() {
	const { closeBooking, setStep, isBookingOpen } = useBooking();
	const [isExitAnimate, triggerAnim, animDuration] = useAnimateDelay(400);
	const { currentStep, isFirstStep, isLastStep, go } = useBookFlow();
	const { formState, formAction, isPending, startTransition, isLoading } =
		useBookFormAction(currentStep, go, triggerAnim);

	const [STEP_BACK, STEP_FORWARD] = [-1, 1] as const;

	const { isSuccess, isError, animDirection } = formState;
	const isSettled = isSuccess || isError;
	const formRef = useRef<HTMLFormElement>(null);

	function handleErrorStep() {
		const resetFormData = new FormData();
		resetFormData.append("reset_error", "true");
		formAction(resetFormData);
		triggerAnim(() => {
			startTransition(() => {
				setStep(4);
			});
		});
	}

	const animStyle = `${animDuration} anim-ease-in-out anim-fill-both`;

	const slideTransition = (() => {
		if (isExitAnimate) {
			return animDirection === STEP_BACK
				? "animate-slide-fade-out-right"
				: "animate-slide-fade-out-left";
		}
		return animDirection === STEP_BACK
			? "animate-slide-fade-in-left"
			: "animate-slide-fade-in-right";
	})();

	return (
		<Dialog isOpen={isBookingOpen} onClose={closeBooking}>
			<form ref={formRef} action={formAction} className="overflow-x-hidden">
				<Dialog.Header>
					<h2 className="text-xl font-semibold">예약하기</h2>
					<BookingStepIndicator
						steps={BOOKING_TEXT.steps}
						currentStep={currentStep}
					/>
				</Dialog.Header>
				<Dialog.Content
					className={clsx("relative", animStyle, slideTransition)}
				>
					{isSettled && (
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
					{!isSettled && isSuccess && <StepComplete />}
					{!isSettled && isError && <StepError />}
				</Dialog.Content>
				<Dialog.Footer className="self-end flex justify-between w-full border-t border-secondary">
					{isSettled && (
						<>
							{!isFirstStep && (
								<Button
									name="direction"
									value={STEP_BACK}
									data-direction="backward"
									type="submit"
									variant="outline"
									size="md"
								>
									이전
								</Button>
							)}
							{!isLastStep && (
								<Button
									variant="primary"
									name="direction"
									value={STEP_FORWARD}
									data-direction="forward"
									className={clsx(
										animStyle,
										isFirstStep ? slideTransition : ""
									)}
									type="submit"
									disabled={isPending || isLoading}
									fullWidth={isFirstStep}
									size="md"
								>
									다음
								</Button>
							)}
						</>
					)}
					{isLastStep && (
						<Button
							className={animStyle}
							disabled={isPending || isLoading}
							type="submit"
							size="md"
						>
							{isLoading ? "전송중..." : BOOKING_TEXT.submit}
						</Button>
					)}
					{!isSettled && isSuccess && (
						<Button fullWidth type="button" onClick={closeBooking}>
							닫기
						</Button>
					)}
					{!isSettled && isError && (
						<Button
							variant="outline"
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
