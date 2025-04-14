import { BOOKING_TEXT } from "../constants";

export default function StepError() {
	return (
		<div className="text-center">
			<h3 className="text-xl font-semibold text-destructive">
				{BOOKING_TEXT.error}
			</h3>
			<p className="text-primary">{BOOKING_TEXT.errorDescription}</p>
		</div>
	);
}
