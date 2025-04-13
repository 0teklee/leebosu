import { PriceTable } from "@/about/PriceTable";
import { Button } from "@components/atom/Button";
import { PageLayout } from "@components/layout/PageLayout";
import { useBooking } from "@hooks/useBooking";
import { ABOUT_TEXT } from "./constants";

function AboutPage() {
	const { openBooking } = useBooking();

	return (
		<PageLayout>
			{/* Top CTA Section */}
			<section className="justify-self-center mb-8">
				<h1 className="text-theme mb-4">{ABOUT_TEXT.subtitle}</h1>
			</section>
			<section className="justify-self-center mb-8">
				<Button onClick={() => openBooking()} size="lg">
					{ABOUT_TEXT.cta}
				</Button>
			</section>

			<section className="mb-12">
				<PriceTable
					title={ABOUT_TEXT.price_table.title}
					description={ABOUT_TEXT.price_table.description}
					items={ABOUT_TEXT.price_table.items}
				/>
			</section>

			{/* Bio Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">경력</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.bio}</p>
			</section>

			{/* Price Table Section */}

			{/* Pricing Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">가격 안내</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.pricing}</p>
			</section>

			{/* Expertise Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">전문 분야</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.expertise}</p>
			</section>

			{/* Service Area Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">서비스 지역</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.service_area}</p>
			</section>

			{/* Guarantee Section */}
			<section className="mb-12">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4">품질 보증</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.guarantee}</p>
			</section>

			{/* Bottom CTA Section */}
			<section className="justify-self-center mb-8">
				<Button onClick={() => openBooking()} size="lg">
					{ABOUT_TEXT.cta}
				</Button>
			</section>
		</PageLayout>
	);
}

export default AboutPage;
