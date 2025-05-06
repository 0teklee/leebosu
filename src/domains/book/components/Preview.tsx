import { SERVICES } from "@/business";
import { FormState } from "../types";

interface PreviewDisplayProps {
	formState: FormState;
}

export default function BookingPreview({ formState }: PreviewDisplayProps) {
	const { mainCategory, subCategory, date, location, contact, description } =
		formState;

	const mainService = mainCategory ? SERVICES[mainCategory] : null;
	const isCustomService = mainService?.custom;

	return (
		<div className="mt-4 p-4 bg-background-secondary rounded-lg">
			{isCustomService && (
				<div className="mb-4">
					<p className="text-theme font-medium">안내</p>
					<p>원하시는 재료를 미리 준비해주시면 공임비만 받습니다.</p>
				</div>
			)}
			<p className="mt-1 text-xs text-destructive/80">
				* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
			</p>
			<div className="space-y-1 *:text-xs text-secondary">
				<p className="mb-2 text-theme font-semibold">선택하신 예약 정보</p>
				{mainService && <p>서비스 : {mainService.name}</p>}
				{subCategory && <p>상세 : {subCategory}</p>}
				{date && <p>날짜 : {new Date(date as string).toLocaleDateString()}</p>}
				{location && <p>지역 : {location}</p>}
				{contact && <p>연락처 : {contact}</p>}
				{description && <p>부가 사항 : {description}</p>}
			</div>
		</div>
	);
}
