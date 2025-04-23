import useAnimateDelay from "@/hooks/useAnimateDelay";
import { Button } from "@components/atom/Button";
import { Dialog } from "@components/atom/Dialog";
import { useBooking } from "@hooks/useBooking";
import clsx from "clsx";
import { BOOKING_TEXT } from "./constants";
import { useBookFlow, useBookFormAction } from "./hooks";
import { STEP_BACK, STEP_FORWARD } from "./types";
import Preview from "./ui/Preview";
import StepIndicator from "./ui/StepIndicator";
import {
	StepComplete,
	StepContact,
	StepDate,
	StepError,
	StepFinal,
	StepLocation,
	StepMainCategory,
	StepSubCategory,
} from "./ui/steps";
import { setFormData } from "./utils";

export default function BookingDialog() {
	const [isExitAnimate, triggerAnim, animDuration] = useAnimateDelay(400);
	const { closeBooking, setStep, isBookingOpen, previousStep } = useBooking();
	const { currentStep, isFirstStep, isLastStep, lastStep } = useBookFlow();
	const {
		formState,
		formAction,
		isTransitionPending,
		startTransition,
		isFetching,
	} = useBookFormAction(currentStep, handleNextStep);

	const { isSuccess, isError } = formState;
	const isSettled = isSuccess || isError;

	function transitionNavigate(step: number) {
		triggerAnim(() => {
			startTransition(() => {
				setStep(step);
			});
		});
	}

	function handleNextStep() {
		transitionNavigate(currentStep + STEP_FORWARD);
	}

	function handlePrevStep() {
		transitionNavigate(currentStep + STEP_BACK);
	}

	function handleErrorStep() {
		const preFinalStep = lastStep - 1;
		const resetFormData = setFormData("reset_error", "true");
		formAction(resetFormData);
		transitionNavigate(preFinalStep);
	}

	/**  history state 기반 transition 애니메이션 방향 결정 */
	const animDirection = previousStep === currentStep ? STEP_BACK : STEP_FORWARD;
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
			<form action={formAction} className="overflow-x-hidden">
				<Dialog.Header>
					<h2 className="text-xl font-semibold">예약하기</h2>
					<StepIndicator
						onClick={transitionNavigate}
						steps={BOOKING_TEXT.steps}
						currentStep={currentStep}
					/>
				</Dialog.Header>
				<Dialog.Content
					className={clsx("relative", animStyle, slideTransition)}
				>
					{!isSettled && (
						<>
							{currentStep === 0 && (
								<StepMainCategory
									state={formState}
									isPending={isTransitionPending}
								/>
							)}
							{currentStep === 1 && (
								<StepSubCategory
									state={formState}
									isPending={isTransitionPending}
								/>
							)}
							{currentStep === 2 && (
								<StepDate state={formState} isPending={isTransitionPending} />
							)}
							{currentStep === 3 && (
								<StepLocation
									state={formState}
									isPending={isTransitionPending}
								/>
							)}
							{currentStep === 4 && (
								<StepContact
									state={formState}
									isPending={isTransitionPending}
								/>
							)}
							{currentStep === 5 && <StepFinal />}
							<Preview formState={formState} />
						</>
					)}
					{isSettled && isSuccess && <StepComplete />}
					{isSettled && isError && <StepError />}
				</Dialog.Content>
				<Dialog.Footer className="self-end flex justify-between w-full border-t border-secondary">
					{/* BEFORE API CALLED */}
					{!isSettled && (
						<>
							{!isFirstStep && (
								<Button
									name="animDirection"
									value={STEP_BACK}
									onClick={handlePrevStep}
									aria-label="backward"
									type="button"
									variant="outline"
									size="md"
								>
									이전
								</Button>
							)}
							{!isLastStep ? (
								<Button
									variant="primary"
									name="animDirection"
									value={STEP_FORWARD}
									aria-label="forward"
									className={clsx(
										animStyle,
										isFirstStep ? slideTransition : ""
									)}
									type="submit"
									disabled={isTransitionPending || isFetching}
									fullWidth={isFirstStep}
									size="md"
								>
									다음
								</Button>
							) : (
								<Button
									className={animStyle}
									disabled={isTransitionPending || isFetching}
									type="submit"
									size="md"
								>
									{isFetching ? "전송중..." : BOOKING_TEXT.submit}
								</Button>
							)}
						</>
					)}
					{/* AFTER API CALLED */}
					{isSettled && (
						<>
							{isSuccess && (
								<Button fullWidth type="button" onClick={closeBooking}>
									닫기
								</Button>
							)}
							{isError && (
								<Button
									variant="outline"
									fullWidth
									type="button"
									onClick={handleErrorStep}
								>
									이전 단계로 돌아가기
								</Button>
							)}
						</>
					)}
				</Dialog.Footer>
			</form>
		</Dialog>
	);
}
