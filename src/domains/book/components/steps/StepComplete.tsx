import {BOOKING_TEXT} from "@/domains/book/constants";
import {CheckIconPath} from "@/components/icons/icon-paths";

export default function StepComplete() {
	return (
		<div className="text-center">
			<svg
				viewBox="0 0 24 24"
				color="currentColor"
				fill="none"
				stroke="currentColor"
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
				className="w-36 h-36 mx-auto text-theme"
			>
				<path d={CheckIconPath} />
			</svg>
			<h3
				className={`
				mb-4 
				text-xl font-semibold text-theme
				anim-duration-300 anim-slide-in-up anim-fill-both anim-timing-ease-in-out
				`}
			>
				{BOOKING_TEXT.success}
			</h3>
			<p className="text-base mb-6 text-primary">{BOOKING_TEXT.confirmation}</p>
			<p className="text-base mb-6 text-primary">{BOOKING_TEXT.confirmation}</p>
		</div>
	);
}
