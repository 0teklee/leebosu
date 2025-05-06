import { SERVICES } from "@/business";
import { BOOKING_TEXT } from "../../constants";
import { FormState } from "../../types";
import PriceNotice from "../PriceNotice";

export default function StepFinal({ formState }: { formState: FormState }) {
	const { mainCategory, subCategory, date, location, contact } = formState;

	const mainService = mainCategory ? SERVICES[mainCategory] : null;
	return (
		<>
			<h3 className="mb-4 text-theme text-center pb-4 border-b border-theme">
				{BOOKING_TEXT.finalStep}
			</h3>
			<div className="mt-4 p-4 bg-background-secondary rounded-lg">
				<PriceNotice mainCategory={mainCategory} />
				<div className="space-y-1 *:text-xs text-secondary">
					<p className="mb-2 text-theme font-semibold">선택하신 예약 정보</p>
					{mainService && <p>대분류 : {mainService.name}</p>}
					{subCategory && <p>소분류 : {subCategory}</p>}
					{date && (
						<p>날짜 : {new Date(date as string).toLocaleDateString()}</p>
					)}
					{location && <p>지역 : {location}</p>}
					{contact && <p>연락처 : {contact}</p>}
				</div>
				<p className="mt-1 text-xs text-destructive/80">
					* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
				</p>
			</div>
		</>
	);
}
