export interface FormState {
	mainCategory: string;
	subCategory: string;
	date: string;
	location: string;
	contact: string;
	lastSaved?: string;
	isSuccess: boolean;
	isError: boolean;
}

export type FormStateKey = keyof FormState;
export type FormStateValue = FormState[FormStateKey];

export interface StepProps {
	state: FormState;
	formAction?: (formData: FormData) => Promise<void> | void;
	isPending: boolean;
}

export interface StepConfig {
	id: string;
	label: string;
	component: React.ComponentType<StepProps>;
	validate: (data: FormData) => Promise<boolean>;
}
