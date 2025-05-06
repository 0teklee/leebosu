import { SERVICES } from "@/business";
import { Input } from "@/components/atom/Input";
import { FormField } from "@components/atom/FormField";
import { Select } from "@components/atom/Select";
import { BOOKING_TEXT, VALIDATION_ERRORS } from "../../constants";
import { FormState } from "../../types";
import PriceNotice from "../PriceNotice";
interface StepProps {
	state: FormState;
	formAction: (formData: FormData) => void;
	isPending: boolean;
}

export default function StepCategory({
	state,
	isPending,
	formAction,
}: StepProps) {
	const mainService = state.mainCategory ? SERVICES[state.mainCategory] : null;
	const options = mainService
		? Object.values(mainService.subCategories).map((service) => ({
				value: service,
				label: service,
		  }))
		: [];

	const [mainLabel, subLabel, descriptionLabel] = BOOKING_TEXT.steps[0].labels;
	const MAX_DESCRIPTION_LENGTH = 50;

	const handleCategoryChange = (
		key: "mainCategory" | "subCategory" | "description",
		value: string
	) => {
		const formData = new FormData();
		formData.append(key, value);
		formAction(formData);
	};

	return (
		<>
			<PriceNotice mainCategory={state.mainCategory} />
			<FormField className="group" label={mainLabel} htmlFor="mainCategory">
				<Select
					id="mainCategory"
					name="mainCategory"
					defaultValue={state.mainCategory || ""}
					disabled={isPending}
					options={Object.entries(SERVICES).map(([value, { name }]) => ({
						value,
						label: name,
					}))}
					required
					onChange={(e) => handleCategoryChange("mainCategory", e)}
				/>
				<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-300 text-destructive text-xs">
					{VALIDATION_ERRORS.mainCategory}
				</p>
			</FormField>
			<FormField className="group" label={subLabel} htmlFor="subCategory">
				<Select
					id="subCategory"
					name="subCategory"
					value={state.subCategory || ""}
					options={options}
					required
					onChange={(e) => handleCategoryChange("subCategory", e)}
				/>
				<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
					{VALIDATION_ERRORS.subCategory}
				</p>
			</FormField>
			<FormField
				className="[&>label]:text-sm [&>label]:text-secondary/70"
				label={descriptionLabel}
				htmlFor="description"
			>
				<Input
					id="description"
					name="description"
					placeholder={`최대 ${MAX_DESCRIPTION_LENGTH}자`}
					maxLength={MAX_DESCRIPTION_LENGTH}
					value={state.description || ""}
					className="placeholder:text-sm"
					onChange={(e) => {
						const formData = new FormData();
						formData.append("description", e.target.value);
						formAction(formData);
					}}
				/>
				<div className="flex justify-end w-full mt-1 ">
					<p className="text-secondary text-xs">
						{state.description?.length || 0} / {MAX_DESCRIPTION_LENGTH}
					</p>
				</div>
			</FormField>
		</>
	);
}
