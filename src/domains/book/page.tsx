import useAnimateDelay from "@/hooks/useAnimateDelay";
import {Button} from "@components/atom/Button";
import {Dialog} from "@components/atom/Dialog";
import {useBooking} from "@hooks/useBooking";
import clsx from "clsx";
import {BOOKING_TEXT, SLIDE_ANIMATION} from "./constants";
import {useBookFlow, useBookFormAction} from "./hooks";
import {STEP_BACK, STEP_FORWARD} from "./types";
import StepIndicator from "@/domains/book/components/StepIndicator";
import {StepCategory, StepComplete, StepError, StepFinal, StepInfo,} from "@/domains/book/components/steps";

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
		shouldNavigateToNext,
		postFormData,
	} = useBookFormAction();

	const { isSuccess, isError } = formState;
	const isSettled = isSuccess || isError;
	const stepProps = {
		state: formState,
		isPending: isTransitionPending,
		formAction,
	};

	/** @description 각 스텝 컴포넌트 목록
	 * - currentStep을 인덱스로 O(1) 접근
	 * - React Compiler로 최적화
	 *  */
	const STEPS_COMPONENTS = [
		<StepCategory {...stepProps} />,
		<StepInfo {...stepProps} />,
		<StepFinal formState={formState} />,
	];

	/**  URL history state 기반 transition 애니메이션 방향 결정 */
	const animDirection = previousStep === currentStep ? STEP_BACK : STEP_FORWARD;
	const animStyle = `${animDuration} anim-ease-in-out anim-fill-both`;

	const slideTransition = (() => {
		const moveDirection = animDirection === STEP_BACK ? "back" : "forward"; // URL history state 기반 애니메이션 방향
		const animInOut = isExitAnimate ? "exit" : "enter"; // 진입/퇴장 애니메이션 상태
		return SLIDE_ANIMATION[moveDirection][animInOut];
	})();

	function transitionNavigate(step: number) {
		triggerAnim(() => {
			startTransition(() => {
				setStep(step);
			});
		});
	}

	async function handleFormAction(formData: FormData) {
		// 마지막 스텝에서는 API 제출
		if (isLastStep) {
			const result = await postFormData(formData);
			const updatedFormData = new FormData();
			updatedFormData.set("isSuccess", `${result.isSuccess}`);
			updatedFormData.set("isError", `${result.isError}`);
			formAction(updatedFormData); // isSuccess/isError 여부에 따라 페이지 변경
			return;
		}
		// 마지막 스텝에서 API 호출
		formAction(formData);

		if (shouldNavigateToNext(currentStep)) {
			transitionNavigate(currentStep + STEP_FORWARD);
		}
	}

	function handlePrevStep() {
		transitionNavigate(currentStep + STEP_BACK);
	}

	function handleErrorStep() {
		const resetFormData = new FormData();
		resetFormData.append("reset_error", "true");
		formAction(resetFormData);
		transitionNavigate(lastStep);
	}

	return (
		<Dialog isOpen={isBookingOpen} onClose={closeBooking}>
			<form action={handleFormAction} className="overflow-x-hidden">
				<Dialog.Header>
					<h2 className="text-xl font-semibold">{BOOKING_TEXT.dialogTitle}</h2>
					<StepIndicator steps={BOOKING_TEXT.steps} currentStep={currentStep} />
				</Dialog.Header>
				<Dialog.Content
					className={clsx("relative", animStyle, slideTransition)}
				>
					{!isSettled && STEPS_COMPONENTS[currentStep]}
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
