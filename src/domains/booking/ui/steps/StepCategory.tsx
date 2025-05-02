import { SERVICES } from "@/business";
import { FormField } from "@components/atom/FormField";
import { Select } from "@components/atom/Select";
import { BOOKING_TEXT, VALIDATION_ERRORS } from "../../constants";
import { FormState } from "../../types";
import { getStepFromUrl } from "../../utils";

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

	const subStep = getStepFromUrl();

	const handleCategoryChange = (
		key: "mainCategory" | "subCategory",
		value: string
	) => {
		const formData = new FormData();
		formData.append(key, value);
		formAction(formData);
	};

	return (
		<>
			<FormField
				className="group"
				label={BOOKING_TEXT.steps[0]}
				htmlFor="mainCategory"
			>
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
					{VALIDATION_ERRORS[0]}
				</p>
			</FormField>
			<FormField
				className="group"
				label={BOOKING_TEXT.steps[1]}
				htmlFor="subCategory"
			>
				<Select
					id="subCategory"
					name="subCategory"
					value={state.subCategory || ""}
					options={options}
					required
					onChange={(e) => handleCategoryChange("subCategory", e)}
				/>
				<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
					{VALIDATION_ERRORS[subStep]}
				</p>
			</FormField>
		</>
	);
}
