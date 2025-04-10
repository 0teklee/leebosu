interface PriceDisplayProps {
	price: number;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
	// Format price with Korean currency
	const formattedPrice = price.toLocaleString("ko-KR");

	return (
		<div className="mt-4 p-4 bg-background-secondary rounded-lg">
			<p className="text-xl font-bold">예상 견적:</p>
			<p className="text-lg font-bold text-theme">약 {formattedPrice}원~</p>
			<p className="mt-1 text-xs text-destructive">
				* 실제 비용은 현장 상황에 따라 달라질 수 있습니다.
			</p>
		</div>
	);
}
