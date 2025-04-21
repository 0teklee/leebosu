import { VALIDATION_ERRORS } from "@/domains/booking/constants";
import { StepProps } from "@/domains/booking/types";
import { getStepFromUrl } from "@/domains/booking/utils";
import { DatePicker } from "@components/atom/DatePicker";
import { FormField } from "@components/atom/FormField";

export default function StepDate({ state, isPending }: StepProps) {
	return (
		<FormField className="group" label="예약 날짜" htmlFor="date">
			<DatePicker
				name="date"
				id="date"
				pattern="\d{4}\.\s\d{1,2}\.\s\d{1,2}\."
				defaultValue={state.date}
				disabled={isPending}
			/>

			<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
				{VALIDATION_ERRORS[getStepFromUrl()]}
			</p>
		</FormField>
	);
}
