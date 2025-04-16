import AboutTable from "@/about/AboutTable";
import BookingButton from "@components/BookingButton";
import { PageLayout } from "@components/layout/PageLayout";
import { ABOUT_TEXT } from "./constants";
function AboutPage() {
	return (
		<PageLayout className="flex flex-col [&>section]:self-stretch items-center gap-8">
			{/* Top CTA Section */}
			<section>
				<h1 className="text-theme mb-4">{ABOUT_TEXT.subtitle}</h1>
			</section>
			<BookingButton size="lg">{ABOUT_TEXT.cta}</BookingButton>
			<section>
				<AboutTable />
			</section>

			{/* Pricing Section */}
			<section>
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-theme">
					가격 안내
				</h2>
				<p className="text-lg mb-1">{ABOUT_TEXT.pricing}</p>
				<p className="mb-4">{ABOUT_TEXT.pricing_description}</p>
			</section>

			{/* Bio Section */}
			<section>
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-theme">
					경력
				</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.bio}</p>
			</section>

			{/* Service Area Section */}
			<section>
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-theme">
					서비스 지역
				</h2>
				<p className="text-lg mb-4">{ABOUT_TEXT.service_area}</p>
			</section>

			{/* Bottom CTA Section */}
			<BookingButton size="lg">{ABOUT_TEXT.cta}</BookingButton>
		</PageLayout>
	);
}

export default AboutPage;
