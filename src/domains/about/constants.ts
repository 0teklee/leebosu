import { SERVICES, SubCategoryKey } from "@/business.ts";

interface TableItem {
	service: string;
	subCategories: readonly SubCategoryKey[];
}

// 대분류, 소분류 서비스 테이블 데이터
export const SERVICE_TABLE_ITEMS: TableItem[] = Object.values(SERVICES).map(
	(value) => {
		return {
			service: value.name,
			subCategories: value.subCategories,
		};
	}
);

export const ABOUT_TEXT = {
	title: "소개",
	subtitle: " 30년 경력의 주거 수리 전문가",
	bio: "최고 품질의 주거 수리 및 인테리어 서비스를 제공합니다. 정확한 작업으로 고객님의 만족을 최우선으로 합니다.",
	pricing: "투명하고 합리적인 가격으로 신뢰를 드립니다.",
	pricing_description: [
		"재료를 미리 준비하신 경우, 공임비만 청구되어 더욱 저렴하게 이용하실 수 있습니다.",
		"최종 비용은 작업 면적과 난이도에 따라 달라질 수 있습니다.",
	],
	cta: "지금 상담 예약하기",
	expertise:
		"수도 누수, 변기 막힘, 타일 교체, 벽지 교체, 전등 설치 등 주거 공간의 모든 수리 및 인테리어 작업을 전문적으로 수행합니다.",
	service_area:
		"안양시 동안구, 만안구 및 인근 지역에서 신속하게 서비스를 제공해 드립니다.",
	guarantee:
		"모든 작업에 품질 보증을 제공하며, 만족스러운 결과를 약속드립니다.",
	price_table: {
		title: "주요 서비스 안내",
		description:
			"다음은 주요 서비스입니다. 정확한 견적은 현장 확인 후 제공됩니다.",
	},
};
