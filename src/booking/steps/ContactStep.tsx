import { FormField } from "../../components/atom/FormField";
import { Input } from "../../components/atom/Input";
import { BOOKING_TEXT, VALIDATION_ERRORS } from "../constants";
import { StepProps } from "../types";
import { getStepFromUrl } from "../utils";

export function ContactStep({ state, isPending }: StepProps) {
	return (
		<FormField className="group" label="연락처 입력" htmlFor="contact">
			<Input
				id="contact"
				name="contact"
				type="tel"
				placeholder={BOOKING_TEXT.contactPlaceholder}
				defaultValue={state.contact}
				disabled={isPending}
				pattern="^\d{3}-\d{3,4}-\d{4}$"
				required
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
