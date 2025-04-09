interface PriceDisplayProps {
	price: number;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
	// Format price with Korean currency
	const formattedPrice = price.toLocaleString("ko-KR");

	return (
		<div className="mt-4 p-4 bg-gray-50 rounded-lg">
			<p className="text-gray-700 font-medium">예상 견적:</p>
			<p className="text-xl font-bold text-primary">약 {formattedPrice}원~</p>
			<p className="mt-1 text-xs text-gray-500">
				* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
			</p>
		</div>
	);
}
