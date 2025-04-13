import { DatePicker } from "../../components/atom/DatePicker";
import { StepProps } from "../types";

export function DateStep({ state, isPending }: StepProps) {
	return (
		<div className="flex flex-col">
			<DatePicker
				label="방문 희망 날짜"
				name="date"
				id="booking-date"
				aria-required="true"
				disabled={isPending}
				onChange={(date) => (state.date = date)}
				value={state.date}
			/>
		</div>
	);
}
