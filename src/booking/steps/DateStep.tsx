import { VALIDATION_ERRORS } from "@/booking/constants";
import { StepProps } from "@/booking/types";
import { getStepFromUrl } from "@/booking/utils";
import { DatePicker } from "@components/atom/DatePicker";
import { FormField } from "@components/atom/FormField";
export function DateStep({ state, isPending }: StepProps) {
	return (
		<FormField className="group" label="예약 날짜" htmlFor="date">
			<DatePicker
				name="date"
				id="booking-date"
				aria-required="true"
				disabled={isPending}
				defaultValue={state.date}
			/>

			<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
				{VALIDATION_ERRORS[getStepFromUrl()]}
			</p>
		</FormField>
	);
}
