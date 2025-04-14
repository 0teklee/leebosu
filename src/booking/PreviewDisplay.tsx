import { useEffect, useState } from "react";
import { SERVICES } from "./constants";
import { FormState } from "./types";
import { calculateEstimatedPrice } from "./utils";

interface PreviewDisplayProps {
	formState: FormState;
	formRef: React.RefObject<HTMLFormElement | null>;
}

export function PreviewDisplay({ formState, formRef }: PreviewDisplayProps) {
	const [previewForm, setPreviewForm] = useState<FormState>(formState);

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

	const { mainCategory, subCategory, date, location, contact } = previewForm;

	const formattedPrice = calculateEstimatedPrice(
		mainCategory as string,
		subCategory as string
	)?.toLocaleString("ko-KR");

	return (
		<div className="mt-4 p-4 bg-background-secondary rounded-lg">
			<div className="mb-4">
				<p className="text-sm font-medium">예상 견적:</p>
				<p className="text-xl font-bold text-theme">약 {formattedPrice}원~</p>
			</div>
			<div className="space-y-1 *:text-xs text-secondary">
				<p className="mb-2 text-theme font-semibold">선택하신 예약 정보</p>
				{mainCategory && (
					<p>
						대분류 : {SERVICES[mainCategory as keyof typeof SERVICES]?.name}
					</p>
				)}
				{subCategory && (
					<p>
						소분류 :{" "}
						{
							SERVICES[
								mainCategory as keyof typeof SERVICES
							]?.subCategories.find((sub) => sub.id === subCategory)?.name
						}
					</p>
				)}
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
