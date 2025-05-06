export function getStepFromUrl() {
	const stepParam = new URLSearchParams(location.search).get("step");
	return Number(stepParam) || 0;
}

export function getPreviousStepFromHistory(): number | undefined {
	if (typeof window !== "undefined" && window.history?.state) {
		return window.history.state.previousStep as number | undefined;
	}
	return undefined;
}

/**
 * @desc 예약 가격 계산 함수
 * @param mainCategory - 메인 카테고리
 * @param subCategory - 서브 카테고리
 * @returns 예약 가격
 * @todo 예상 가격 주석처리 (서비스 정책 변경) 
	 export function calculateEstimatedPrice(
	 	mainCategory: string | null,
	 	subCategory: string | null
	 ): number {
	 	const fallback = { subCategories: [], baseMinPrice: 0 };	
	 	const category = mainCategory
	 		? SERVICES[mainCategory as keyof typeof SERVICES]
	 		: fallback;	
	 	const subCategoryPrice = subCategory
	 			? category.subCategories.find((sub) => sub.id === subCategory)?.basePrice
		: undefined;
	return subCategoryPrice ?? category.baseMinPrice;
}
*/
