import { FormField } from "../../components/atom/FormField";
import { Select } from "../../components/atom/Select";
import { SERVICES } from "../text";
import { StepProps } from "../types";

export function SubCategoryStep({ state }: StepProps) {
	const category = SERVICES[state.mainCategory as keyof typeof SERVICES];
	const options =
		category?.subCategories.map(({ id, name }) => ({
			value: id,
			label: name,
		})) || [];

	return (
		<FormField label="소분류 선택" htmlFor="subCategory">
			<Select
				id="subCategory"
				name="subCategory"
				defaultValue={state.subCategory}
				options={options}
			/>
			<input
				type="hidden"
				name="estimatedPrice"
				value={
					category?.subCategories.find((sub) => sub.id === state.subCategory)
						?.basePrice ?? ""
				}
			/>
			{state.validationErrors?.subCategory && (
				<p className="text-destructive text-sm mt-1">
					{state.validationErrors.subCategory}
				</p>
			)}
		</FormField>
	);
}
