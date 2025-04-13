import { FormField } from "../../components/atom/FormField";
import { Select } from "../../components/atom/Select";
import { SERVICES, VALIDATION_ERRORS } from "../constants";
import { StepProps } from "../types";
import { getStepFromUrl } from "../utils";

export function SubCategoryStep({ state }: StepProps) {
	const category = SERVICES[state.mainCategory as keyof typeof SERVICES];
	const options =
		category?.subCategories.map(({ id, name }) => ({
			value: id,
			label: name,
		})) || [];

	const subStep = getStepFromUrl();
	return (
		<FormField className="group" label="소분류 선택" htmlFor="subCategory">
			<Select
				id="subCategory"
				name="subCategory"
				defaultValue={state.subCategory}
				options={options}
				required
			/>
			<input
				type="hidden"
				name="estimatedPrice"
				value={
					category?.subCategories.find((sub) => sub.id === state.subCategory)
						?.basePrice ?? ""
				}
			/>
			<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
				{VALIDATION_ERRORS[subStep]}
			</p>
		</FormField>
	);
}
