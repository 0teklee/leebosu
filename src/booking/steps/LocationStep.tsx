import { FormField } from "../../components/atom/FormField";
import { Input } from "../../components/atom/Input";
import { BOOKING_TEXT, VALIDATION_ERRORS } from "../constants";
import { StepProps } from "../types";
import { getStepFromUrl } from "../utils";

export function LocationStep({ state }: StepProps) {
	return (
		<FormField className="group" label="지역 입력" htmlFor="location">
			<Input
				id="location"
				name="location"
				type="text"
				placeholder={BOOKING_TEXT.locationPlaceholder}
				defaultValue={state.location}
				required
				className="peer"
			/>
			<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
				{VALIDATION_ERRORS[getStepFromUrl()]}
			</p>
			<label
				htmlFor="location"
				className="text-xs font-semibold text-destructive/90"
			>
				{BOOKING_TEXT.locationDescription}
			</label>
		</FormField>
	);
}
