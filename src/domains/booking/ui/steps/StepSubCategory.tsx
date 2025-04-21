import { SERVICES } from "@/business.ts";
import { FormField } from "@components/atom/FormField";
import { Select } from "@components/atom/Select";
import { VALIDATION_ERRORS } from "../../constants";
import { StepProps } from "../../types";
import { getStepFromUrl } from "../../utils";

export default function StepSubCategory({ state }: StepProps) {
	const mainService = state.mainCategory ? SERVICES[state.mainCategory] : null;
	const options = mainService
		? Object.values(mainService.subCategories).map((service) => ({
				value: service,
				label: service,
		  }))
		: [];

	const subStep = getStepFromUrl();

	return (
		<FormField className="group" label="소분류 선택" htmlFor="subCategory">
			<Select
				id="subCategory"
				name="subCategory"
				defaultValue={state.subCategory || ""}
				options={options}
				required
			/>
			<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
				{VALIDATION_ERRORS[subStep]}
			</p>
		</FormField>
	);
}

{
	/*
				TODO: 예상 가격 계산 기능 추가 시 사용
			<input
				type="hidden"
				name="estimatedPrice"
				value={
					(state.subCategory &&
						category?.subCategories[state.subCategory.id]?.basePrice) ||
					""
				}  
			/> */
}
