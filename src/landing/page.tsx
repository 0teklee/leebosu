import { useBooking } from "@hooks/useBooking";
import { Button } from "@components/atom/Button";
import { PageLayout } from "@components/layout/PageLayout";

function LandingPage() {
	const { openBooking } = useBooking();

	return (
		<PageLayout>
			{/* Hero Section */}
			<section className="space-y-5 mb-12 text-center">
				<h1 className="heading-1 mb-4">
					집수리/인테리어 전문가, 이보수입니다.
				</h1>
				<p className="paragraph">
					25년 동안 경기 안양 지역의 집수리/인테리어를 해왔습니다.
				</p>
				<Button
					fullWidth
					onClick={() => openBooking()}
					className="inline-block sm:max-w-sm"
					size="lg"
				>
					지금 바로 예약하기
				</Button>
			</section>

			{/* Price Sample Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">
					기본 가격 안내
				</h2>
				<div className="p-4 rounded-lg">
					<p className="text-lg">타일 교체: 150,000원~</p>
				</div>
			</section>

			{/* Profile Section */}
			<section>
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">연락 방법</h2>
				<p className="text-lg">
					문자 또는 전화로만 상담 가능. 확정된 예약만 연락드립니다.
				</p>
			</section>
		</PageLayout>
	);
}

export default LandingPage;
