import { FormField } from "../../components/atom/FormField";
import { Input } from "../../components/atom/Input";
import { BOOKING_TEXT } from "../text";
import { StepProps } from "../types";

export function LocationStep({ state }: StepProps) {
	return (
		<FormField label="지역 입력" htmlFor="location">
			<Input
				id="location"
				name="location"
				type="text"
				placeholder={BOOKING_TEXT.locationPlaceholder}
				defaultValue={state.location}
			/>
			{state.validationErrors?.location && (
				<p className="text-destructive text-sm mt-1">
					{state.validationErrors.location}
				</p>
			)}
			<label
				htmlFor="location"
				className="text-xs font-semibold text-destructive/90"
			>
				{BOOKING_TEXT.locationDescription}
			</label>
		</FormField>
	);
}
