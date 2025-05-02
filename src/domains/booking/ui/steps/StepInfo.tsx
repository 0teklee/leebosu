import { DatePicker } from "@/components/atom/DatePicker";
import { FormField } from "@/components/atom/FormField";
import { Input } from "@/components/atom/Input";
import { BOOKING_TEXT, VALIDATION_ERRORS } from "@/domains/booking/constants";
import { FormState } from "@/domains/booking/types";
import { getStepFromUrl } from "@/domains/booking/utils";

interface StepProps {
	state: FormState;
	formAction: (formData: FormData) => void;
	isPending: boolean;
}

export default function StepInfo({ state, isPending, formAction }: StepProps) {
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
		<>
			<FormField className="group" label="예약 날짜" htmlFor="date">
				<DatePicker
					name="date"
					id="date"
					pattern="\d{4}\.\s\d{1,2}\.\s\d{1,2}\."
					defaultValue={state.date}
					disabled={isPending}
					onChange={(e) => {
						const formData = new FormData();
						formData.append("date", e.target.value);
						formAction(formData);
					}}
				/>

				<p className="mt-1 opacity-0 group-has-user-invalid:opacity-100 duration-200 text-destructive text-xs">
					{VALIDATION_ERRORS[getStepFromUrl()]}
				</p>
			</FormField>

			<FormField className="group" label="지역 입력" htmlFor="location">
				<Input
					id="location"
					name="location"
					type="text"
					placeholder={BOOKING_TEXT.locationPlaceholder}
					defaultValue={state.location}
					required
					className="peer"
					onChange={(e) => {
						const formData = new FormData();
						formData.append("location", e.target.value);
						formAction(formData);
					}}
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
					onBlur={(e) => {
						const formData = new FormData();
						formData.append("contact", e.target.value);
						formAction(formData);
					}}
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
		</>
	);
}
