import { FormField } from "../../components/atom/FormField";
import { Select } from "../../components/atom/Select";
import { SERVICES, VALIDATION_ERRORS } from "../constants";
import { StepProps } from "../types";
import { getStepFromUrl } from "../utils";

export function MainCategoryStep({ state, isPending }: StepProps) {
	const mainStep = getStepFromUrl();
	return (
		<FormField className="group" label="대분류 선택" htmlFor="mainCategory">
			<Select
				id="mainCategory"
				name="mainCategory"
				defaultValue={state.mainCategory}
				disabled={isPending}
				options={Object.entries(SERVICES).map(([value, { name }]) => ({
					value,
					label: name,
				}))}
				required
			/>
			<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-300 text-destructive text-xs">
				{VALIDATION_ERRORS[mainStep]}
			</p>
		</FormField>
	);
}
