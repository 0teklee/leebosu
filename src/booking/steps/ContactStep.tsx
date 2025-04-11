import { FormField } from "../../components/atom/FormField";
import { Input } from "../../components/atom/Input";
import { BOOKING_TEXT } from "../text";
import { StepProps } from "../types";

export function ContactStep({ state, isPending }: StepProps) {
	return (
		<FormField label="연락처 입력" htmlFor="contact">
			<Input
				id="contact"
				name="contact"
				type="tel"
				placeholder={BOOKING_TEXT.contactPlaceholder}
				defaultValue={state.contact}
				disabled={isPending}
				pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
			/>
			{state.validationErrors?.contact && (
				<p className="text-destructive text-sm mt-1">
					{state.validationErrors.contact}
				</p>
			)}
		</FormField>
	);
}
