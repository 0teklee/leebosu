import { FormField } from "../../components/atom/FormField";
import { Select } from "../../components/atom/Select";
import { SERVICES } from "../text";
import { StepProps } from "../types";

export function MainCategoryStep({ state, isPending }: StepProps) {
	return (
		<FormField label="대분류 선택" htmlFor="mainCategory">
			<Select
				id="mainCategory"
				name="mainCategory"
				defaultValue={state.mainCategory}
				disabled={isPending}
				options={Object.entries(SERVICES).map(([value, { name }]) => ({
					value,
					label: name,
				}))}
			/>
			{state.validationErrors?.mainCategory && (
				<p className="text-destructive text-sm mt-1">
					{state.validationErrors.mainCategory}
				</p>
			)}
		</FormField>
	);
}
