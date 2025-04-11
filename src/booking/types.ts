export interface StepState {
	currentStep: number;
	mainCategory: string;
	subCategory: string;
	date: string;
	location: string;
	contact: string;
	estimatedPrice: number;
	validationErrors: Record<string, string> | null;
	lastCompletedStep: number;
	lastSaved?: string;
	isSubmitted?: boolean;
}

export interface StepProps {
	state: StepState;
	formAction?: (formData: FormData) => Promise<void> | void;
	isPending: boolean;
}

export interface StepConfig {
	id: string;
	label: string;
	component: React.ComponentType<StepProps>;
	validate: (data: FormData) => Promise<boolean>;
}
