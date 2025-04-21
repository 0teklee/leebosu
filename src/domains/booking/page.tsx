import useAnimateDelay from "@/hooks/useAnimateDelay";
import { Button } from "@components/atom/Button";
import { Dialog } from "@components/atom/Dialog";
import { useBooking } from "@hooks/useBooking";
import clsx from "clsx";
import { BOOKING_TEXT } from "./constants";
import { useBookFlow, useBookFormAction } from "./hooks";
import { ANIM_DIRECTION } from "./types";
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

export default function BookingDialog() {
	const [isExitAnimate, triggerAnim, animDuration] = useAnimateDelay(400);
	const [STEP_BACK, STEP_FORWARD] = ANIM_DIRECTION;

	const { closeBooking, setStep, isBookingOpen } = useBooking();
	const { currentStep, isFirstStep, isLastStep, go, lastStep } = useBookFlow();
	const { formState, formAction, isPending, startTransition, isLoading } =
		useBookFormAction(currentStep, go, triggerAnim);

	const { isSuccess, isError, animDirection } = formState;
	const isSettled = isSuccess || isError;

	function handleErrorStep() {
		const resetFormData = new FormData();
		resetFormData.append("reset_error", "true");
		formAction(resetFormData);
		triggerAnim(() => {
			startTransition(() => {
				setStep(lastStep - 1);
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
			<form action={formAction} className="overflow-x-hidden">
				<Dialog.Header>
					<h2 className="text-xl font-semibold">예약하기</h2>
					<StepIndicator steps={BOOKING_TEXT.steps} currentStep={currentStep} />
				</Dialog.Header>
				<Dialog.Content
					className={clsx("relative", animStyle, slideTransition)}
				>
					{!isSettled && (
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
							{!isLastStep ? (
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
							) : (
								<Button
									className={animStyle}
									disabled={isPending || isLoading}
									type="submit"
									size="md"
								>
									{isLoading ? "전송중..." : BOOKING_TEXT.submit}
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
