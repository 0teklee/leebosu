import { PROTECTION_AGREEMENT, SERVICES } from "@/business";
import Details from "@/components/atom/Details";
import { BOOKING_TEXT } from "../../constants";
import { FormState } from "../../types";
import PriceNotice from "../PriceNotice";

export default function StepFinal({
	formState,
	formAction,
}: {
	formState: FormState;
	formAction: (formData: FormData) => void;
}) {
	const { mainCategory, subCategory, date, location, contact, description } =
		formState;
	const mainService = mainCategory ? SERVICES[mainCategory] : null;

	return (
		<>
			<h3 className="mb-4 text-theme text-center pb-4 border-b border-theme">
				{BOOKING_TEXT.finalStep}
			</h3>
			<div className="mt-4 p-4 bg-background-secondary rounded-lg">
				<div className="space-y-1 *:text-sm text-secondary">
					<p className="mb-2 text-theme font-semibold">안내</p>
					<div className="flex items-center gap-1 font-semibold">
						<span>상담 시간 :</span>
						<span>오전 10시 ~ 오후 6시</span>
					</div>
					<p>작성해주신 내용을 바탕으로 상담 전화드리겠습니다.</p>
					<PriceNotice mainCategory={mainCategory} />
				</div>
				<div className="space-y-1 *:text-sm text-secondary">
					<p className="mb-2 text-theme font-semibold">상담 예약 정보</p>
					{mainService && <p>대분류 : {mainService.name}</p>}
					{subCategory && <p>소분류 : {subCategory}</p>}
					{date && (
						<p>날짜 : {new Date(date as string).toLocaleDateString()}</p>
					)}
					{location && <p>지역 : {location}</p>}
					{contact && <p>연락처 : {contact}</p>}
					{description && <p>부가 사항 : {description}</p>}
				</div>
				<p className="mt-1 text-xs text-destructive/80">
					* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
				</p>
			</div>
			<div className="mt-4 p-4 bg-background-secondary rounded-lg">
				<Details
					title={PROTECTION_AGREEMENT.title}
					detailsClassName="space-y-2"
					height="h-full"
				>
					<div className="space-y-4">
						{PROTECTION_AGREEMENT.items.map((item) => (
							<div key={item.title} className="space-y-1">
								<p className="font-semibold">{item.title}</p>
								<p className="text-sm whitespace-pre-line">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</Details>
				<div className="flex items-center gap-2 mt-4">
					<input
						checked={formState.agreement}
						onChange={(e) => {
							const formData = new FormData();
							formData.append("agreement", e.target.checked.toString());
							formAction(formData);
						}}
						type="checkbox"
						id="agreement"
						className="w-4 h-4"
					/>
					<p className="font-medium text-theme">
						{PROTECTION_AGREEMENT.confirm}
					</p>
				</div>
			</div>
		</>
	);
}
