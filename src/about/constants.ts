import { SERVICES } from "@/booking/constants";

interface PriceItem {
	service: string;
	price: string;
	time: string;
}

// 서비스 데이터를 가격표 형식으로 변환하는 함수
const generatePriceTableItems = (): PriceItem[] => {
	const items: PriceItem[] = [];

	// 수리 카테고리 추가
	Object.values(SERVICES.repair.subCategories).forEach((service) => {
		items.push({
			service: service.name,
			price: `${service.basePrice.toLocaleString()}원~`,
			time: service.id === "plumbing" ? "약 1-2시간" : "면적에 따라 상이",
		});
	});

	// 인테리어 카테고리 추가
	Object.values(SERVICES.interior.subCategories).forEach((service) => {
		items.push({
			service: service.name,
			price: `${service.basePrice.toLocaleString()}원~`,
			time: "면적에 따라 상이",
		});
	});

	return items;
};

export const ABOUT_TEXT = {
	title: "소개",
	subtitle: " 안양 지역 30년 경력의 주거 수리 전문가",
	bio: "안양 지역에서 30년 이상의 풍부한 경험을 바탕으로 최고 품질의 주거 수리 및 인테리어 서비스를 제공합니다. 신속하고 정확한 작업으로 고객님의 만족을 최우선으로 합니다.",
	pricing:
		"투명하고 합리적인 가격 정책으로 고객님께 신뢰를 드립니다. 모든 작업별 기본 가격을 명확하게 공개하며, 실제 비용은 작업 면적과 난이도에 따라 조정될 수 있습니다.",
	cta: "지금 바로 예약하기",
	expertise:
		"수도 누수, 변기 막힘, 타일 교체, 벽지 교체, 전등 설치 등 주거 공간의 모든 수리 및 인테리어 작업을 전문적으로 수행합니다.",
	service_area:
		"안양시 동안구, 만안구 및 인근 지역에서 신속하게 서비스를 제공해 드립니다.",
	guarantee:
		"모든 작업에 품질 보증을 제공하며, 만족스러운 결과를 약속드립니다.",
	price_table: {
		title: "주요 서비스 가격 안내",
		description:
			"다음은 주요 서비스의 기본 가격입니다. 정확한 견적은 현장 확인 후 제공됩니다.",
		items: generatePriceTableItems(),
	},
};
