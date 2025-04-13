import { SERVICES } from "./constants";
import { FormState } from "./types";

interface PreviewDisplayProps {
	currentStep: number;
	currentFormData: FormState;
	estimatedPrice?: number;
}

export function PreviewDisplay({
	currentFormData,
	estimatedPrice = 0,
}: PreviewDisplayProps) {
	const { mainCategory, subCategory, date, location, contact } =
		currentFormData;

	const formattedPrice = estimatedPrice?.toLocaleString("ko-KR");

	return (
		<div className="mt-4 p-4 bg-background-secondary rounded-lg">
			<div className="mb-4">
				<p className="text-sm font-medium">예상 견적:</p>
				<p className="text-xl font-bold text-theme">약 {formattedPrice}원~</p>
			</div>
			<div className="space-y-1 *:text-xs text-secondary">
				{mainCategory && (
					<p>대분류 : {SERVICES[mainCategory as keyof typeof SERVICES].name}</p>
				)}
				{subCategory && (
					<p>
						소분류 :{" "}
						{
							SERVICES[
								mainCategory as keyof typeof SERVICES
							].subCategories.find((sub) => sub.id === subCategory)?.name
						}
					</p>
				)}
				{date && <p>날짜 : {new Date(date).toLocaleDateString()}</p>}
				{location && <p>지역 : {location}</p>}
				{contact && <p>연락처 : {contact}</p>}
			</div>
			<p className="mt-1 text-xs text-destructive/80">
				* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
			</p>
		</div>
	);
}
