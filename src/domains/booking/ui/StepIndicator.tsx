import clsx from "clsx";

interface StepIndicatorProps {
	steps: { title: string; labels?: string[] }[];
	currentStep: number;
}

export default function BookingStepIndicator({
	steps,
	currentStep,
}: StepIndicatorProps) {
	return (
		<div
			className={clsx("mb-6 w-full", "transition-all duration-300 ease-in-out")}
		>
			<div className="flex justify-between">
				{steps.map((step, index) => {
					const [isCurrentStep, isPreviousStep, isNextStep] = [
						index === currentStep,
						index < currentStep,
						index > currentStep,
					];
					return (
						<div key={index} className={clsx("flex flex-col items-center")}>
							<span
								className={clsx(
									"mt-1 text-xs",
									isCurrentStep && "text-theme",
									isPreviousStep && "text-theme/60",
									isNextStep && "text-secondary"
								)}
							>
								{step.title}
							</span>
						</div>
					);
				})}
			</div>
			<div className="relative mt-2">
				<div className="absolute inset-0 flex items-center">
					<div className="h-0.5 w-full bg-background-secondary"></div>
				</div>
				<div
					className="absolute inset-0 flex items-center transition-width duration-300 ease-in-out"
					style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
				>
					<div className="h-0.5 w-full bg-theme"></div>
				</div>
			</div>
		</div>
	);
}
