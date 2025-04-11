import { useBooking } from "../booking/BookingContext";
import { Button } from "../components/atom/Button.tsx";
import { PageLayout } from "../components/layout/PageLayout.tsx";

function AboutPage() {
	const { openBooking } = useBooking();

	return (
		<PageLayout title="이보수 소개">
			{/* Bio Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">경력</h2>
				<p className="text-lg mb-4">
					25년간 안양 지역에서 주거 수리 및 인테리어를 전문으로 일해왔습니다.
				</p>
			</section>

			{/* Pricing Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">가격 안내</h2>
				<p className="text-lg mb-4">
					작업별 기본 가격을 투명하게 공개합니다. 실제 비용은 면적과 난이도에
					따라 달라질 수 있습니다.
				</p>
			</section>

			{/* CTA Section */}
			<section className="text-center">
				<Button
					onClick={() => openBooking()}
					className="sm:max-w-sm"
					size="lg"
					fullWidth
				>
					예약하러 가기
				</Button>
			</section>
		</PageLayout>
	);
}

export default AboutPage;
