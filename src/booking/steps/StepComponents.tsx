import { FormState } from "../types";
import { ContactStep } from "./ContactStep";
import { DateStep } from "./DateStep";
import { LocationStep } from "./LocationStep";
import { MainCategoryStep } from "./MainCategoryStep";
import { SubCategoryStep } from "./SubCategoryStep";

interface StepProps {
	currentStep: number;
	state: FormState;
	isPending: boolean;
}
export function StepComponents({ currentStep, state, isPending }: StepProps) {
	switch (currentStep) {
		case 0:
			return <MainCategoryStep state={state} isPending={isPending} />;
		case 1:
			return <SubCategoryStep state={state} isPending={isPending} />;

		case 2:
			return <DateStep state={state} isPending={isPending} />;
		case 3:
			return <LocationStep state={state} isPending={isPending} />;
		case 4:
			return <ContactStep state={state} isPending={isPending} />;
		default:
			return null;
	}
}
