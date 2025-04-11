import { DatePicker } from "../../components/atom/DatePicker";
import { FormField } from "../../components/atom/FormField";
import { StepProps } from "../types";

export function DateStep({ state, isPending }: StepProps) {
	return (
		<FormField label="날짜 선택" htmlFor="date">
			<DatePicker
				id="date"
				name="date"
				value={state.date}
				disabled={isPending}
			/>
			{state.validationErrors?.date && (
				<p className="text-destructive text-sm mt-1">
					{state.validationErrors.date}
				</p>
			)}
		</FormField>
	);
}
