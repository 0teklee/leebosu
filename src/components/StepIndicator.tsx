interface StepIndicatorProps {
	steps: string[];
	currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
	return (
		<div className="mb-6">
			<div className="flex justify-between">
				{steps.map((step, index) => (
					<div key={index} className="flex flex-col items-center">
						<div
							className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium 
                ${
									index < currentStep
										? "bg-blue-600 text-white"
										: index === currentStep
										? "border-2 border-blue-600 bg-white text-blue-600"
										: "border border-gray-300 bg-white text-gray-500"
								}`}
						>
							{index + 1}
						</div>
						<span className="mt-1 text-xs text-gray-600">{step}</span>
					</div>
				))}
			</div>
			<div className="relative mt-2">
				<div className="absolute inset-0 flex items-center">
					<div className="h-0.5 w-full bg-gray-200"></div>
				</div>
				<div
					className="absolute inset-0 flex items-center"
					style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
				>
					<div className="h-0.5 w-full bg-blue-600"></div>
				</div>
			</div>
		</div>
	);
}
