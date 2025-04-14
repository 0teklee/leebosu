import useAnimateDelay from "@/hooks/useAnimateDelay";
import { Dialog } from "@components/atom/Dialog";
import { useBooking } from "@hooks/useBooking";
import { useActionState, useState, useTransition } from "react";
import { Button } from "../components/atom/Button";
import { BOOKING_TEXT, INIT_STATE } from "./constants";
import { PreviewDisplay } from "./PreviewDisplay";
import { StepIndicator } from "./StepIndicator";
import { CompleteStep } from "./steps/Complete";
import { ContactStep } from "./steps/ContactStep";
import { DateStep } from "./steps/DateStep";
import { ErrorStep } from "./steps/Error";
import { LocationStep } from "./steps/LocationStep";
import { MainCategoryStep } from "./steps/MainCategoryStep";
import { SubCategoryStep } from "./steps/SubCategoryStep";
import { FormState } from "./types";
import {
	calculateEstimatedPrice,
	extractFormData,
	getCurrentKey,
	getStepFromUrl,
} from "./utils";

export default function BookingDialog() {
	const { closeBooking, setStep } = useBooking();

	const [formState, formAction] = useActionState<FormState, FormData>(
		(prevState, formData) => {
			const updateKey = getCurrentKey();
			const updateValue = extractFormData(formData);
			const nextState = {
				...prevState,
				[updateKey]: updateValue,
			};
			handleNextStep(); // 다음 단계로 이동

			return nextState;
		},
		INIT_STATE
	);

	const { isSuccess, isError } = formState;

	const [isPending, startTransition] = useTransition();
	const [isAnimating, triggerAnim, animDuration] = useAnimateDelay(400);
	const [direction, setDirection] = useState<"forward" | "backward">("forward");

	const animStyle = `anim-duration-${animDuration} anim-ease-in-out anim-fill-both`;

	const estimatedPrice = calculateEstimatedPrice(
		formState.mainCategory,
		formState.subCategory
	);

	const isOpen = location.pathname === "/booking";
	const currentStep = getStepFromUrl();

	function handleNextStep(): void {
		setDirection("forward");
		triggerAnim(() => {
			startTransition(() => {
				setStep(currentStep + 1);
			});
		});
	}

	function handlePrevStep(): void {
		setDirection("backward");
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
			});
		});
	}

	const [isFirstStep, isLastStep] = [
		currentStep === 0,
		currentStep === BOOKING_TEXT.steps.length - 1,
	];

	// 현재 단계와 이전 단계의 비교로 이동 방향 결정
	const enteringTransition =
		direction === "backward"
			? "animate-slide-fade-in-left"
			: "animate-slide-fade-in-right";
	const exitingTransition =
		direction === "backward"
			? "animate-slide-fade-out-right"
			: "animate-slide-fade-out-left";

	const slideTransition = isAnimating ? exitingTransition : enteringTransition;

	return (
		<Dialog isOpen={isOpen} onClose={closeBooking}>
			<form action={formAction} className="overflow-x-hidden">
				<Dialog.Header>
					<h2 className="text-xl font-semibold">예약하기</h2>
					<StepIndicator steps={BOOKING_TEXT.steps} currentStep={currentStep} />
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
								<MainCategoryStep state={formState} isPending={isPending} />
							)}
							{currentStep === 1 && (
								<SubCategoryStep state={formState} isPending={isPending} />
							)}
							{currentStep === 2 && (
								<DateStep state={formState} isPending={isPending} />
							)}
							{currentStep === 3 && (
								<LocationStep state={formState} isPending={isPending} />
							)}
							{currentStep === 4 && (
								<ContactStep state={formState} isPending={isPending} />
							)}
							<PreviewDisplay
								currentStep={currentStep}
								currentFormData={formState}
								estimatedPrice={estimatedPrice}
							/>
						</>
					)}
					{isSuccess && <CompleteStep />}
					{isError && <ErrorStep />}
				</Dialog.Content>
				<Dialog.Footer className="self-end flex justify-between w-full border-t border-secondary">
					{currentStep > 0 && (
						<Button
							type="button"
							variant="outline"
							onClick={handlePrevStep}
							size="md"
						>
							이전
						</Button>
					)}

					{!isSuccess && !isError && (
						<Button
							variant="primary"
							className={`
								${animStyle}
								${isFirstStep ? slideTransition : ""}
							`}
							type="submit"
							disabled={isPending}
							fullWidth={isFirstStep}
							size="md"
						>
							{isLastStep ? BOOKING_TEXT.submit : "다음"}
						</Button>
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
