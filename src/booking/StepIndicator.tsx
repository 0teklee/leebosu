interface StepIndicatorProps {
	steps: string[];
	currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
	return (
		<div className="mb-6 w-full">
			<div className="flex justify-between">
				{steps.map((step, index) => {
					const [isCurrentStep, isPreviousStep, isNextStep] = [
						index === currentStep,
						index < currentStep,
						index > currentStep,
					];

					return (
						<div key={index} className="flex flex-col items-center">
							<div
								className={`
								flex items-center justify-center 
               					h-8 w-8
								text-sm font-medium
								rounded-full ring-2  
								transition-colors duration-300
								anim-duration-1000 anim-iteration-infinite
								anim-timing-ease-in-out
								${isCurrentStep ? "animate-bounce ring-theme text-theme" : ""}
								${isPreviousStep ? "ring-theme/80 bg-theme/95 text-background" : ""}
								${isNextStep ? "ring-secondary text-secondary" : ""}
								`}
							>
								{index + 1}
							</div>
							<span
								className={`mt-1 text-xs ${isCurrentStep && "text-theme"} ${
									isPreviousStep && "text-theme/70"
								}`}
							>
								{step}
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
