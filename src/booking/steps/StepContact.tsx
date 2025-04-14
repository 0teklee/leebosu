import { FormField } from "@components/atom/FormField";
import { Input } from "@components/atom/Input";
import { BOOKING_TEXT, VALIDATION_ERRORS } from "../constants";
import { StepProps } from "../types";
import { getStepFromUrl } from "../utils";

export default function StepContact({ state, isPending }: StepProps) {
	function formatPhoneNumber(raw: string) {
		const digitsOnly = raw.replace(/\D/g, "").slice(0, 11);

		if (digitsOnly.length >= 11) {
			return digitsOnly.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
		} else if (digitsOnly.length >= 7) {
			return digitsOnly.replace(/(\d{3})(\d{3,4})(\d{0,4})/, "$1-$2-$3");
		} else if (digitsOnly.length >= 4) {
			return digitsOnly.replace(/(\d{3})(\d{0,4})/, "$1-$2");
		}

		return digitsOnly;
	}

	function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length === 13) {
			e.target.blur();
		}
		const formatted = formatPhoneNumber(e.target.value);
		e.target.value = formatted;
	}

	return (
		<FormField className="group" label="연락처 입력" htmlFor="contact">
			<Input
				id="contact"
				name="contact"
				type="tel"
				placeholder={BOOKING_TEXT.contactPlaceholder}
				defaultValue={state.contact}
				disabled={isPending}
				required
				onChange={handlePhoneNumberChange}
				maxLength={13}
				pattern="^\d{3}-\d{3,4}-\d{4}$"
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
