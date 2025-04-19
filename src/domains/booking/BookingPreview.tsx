import { SERVICES } from "@/business";
import { useEffect, useState } from "react";
import { FormState } from "./types";

interface PreviewDisplayProps {
	formState: FormState;
	formRef: React.RefObject<HTMLFormElement | null>;
}

export default function BookingPreview({
	formState,
	formRef,
}: PreviewDisplayProps) {
	const [
		{ mainCategory, subCategory, date, location, contact },
		setPreviewForm,
	] = useState<FormState>(formState);

	const mainService = mainCategory ? SERVICES[mainCategory] : null;
	const isCustomService = mainService?.custom;

	/**
	 * 예상 비용 계산 - 아버지가 원하지 않는다 하여 사용
	 * const formattedPrice = calculateEstimatedPrice(
	 * 	mainCategory as string,
	 * 	subCategory as string
	 * )?.toLocaleString("ko-KR");
	 */

	useEffect(() => {
		const formEl = formRef.current;
		if (!formEl) return;

		const handleChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			const value = target.value;
			const name = target.name;
			setPreviewForm((prev) => ({ ...prev, [name]: value }));
		};

		formEl.addEventListener("change", handleChange);
		formEl.addEventListener("input", handleChange);

		return () => {
			formEl.removeEventListener("change", handleChange);
			formEl.removeEventListener("input", handleChange);
		};
	}, [formRef]);

	return (
		<div className="mt-4 p-4 bg-background-secondary rounded-lg">
			{isCustomService && (
				<div className="mb-4">
					<p className="text-sm font-medium">안내</p>
					{/* <p className="text-xl font-bold text-theme">약 {formattedPrice}원~</p> */}
					<p className="text-theme">
						원하시는 재료를 미리 준비해주시면 공임비만 받습니다.
					</p>
				</div>
			)}
			<div className="space-y-1 *:text-xs text-secondary">
				<p className="mb-2 text-theme font-semibold">선택하신 예약 정보</p>
				{mainService && <p>대분류 : {mainService.name}</p>}
				{subCategory && <p>소분류 : {subCategory}</p>}
				{date && <p>날짜 : {new Date(date as string).toLocaleDateString()}</p>}
				{location && <p>지역 : {location}</p>}
				{contact && <p>연락처 : {contact}</p>}
			</div>
			<p className="mt-1 text-xs text-destructive/80">
				* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
			</p>
		</div>
	);
}
