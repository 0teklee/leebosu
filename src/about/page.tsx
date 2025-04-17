import AboutTable from "@/about/AboutTable";
import BookingButton from "@components/BookingButton";
import { PageLayout } from "@components/layout/PageLayout";
import { ABOUT_TEXT } from "./constants";
function AboutPage() {
	return (
		<PageLayout className="flex flex-col container *:lg:w-4xl items-center gap-8">
			<header className="flex flex-col items-center gap-y-4 my-4">
				<h1 className="text-theme text-center text-xl sm:text-2xl md:text-3xl font-bold">
					{ABOUT_TEXT.subtitle}
				</h1>
				<BookingButton size="lg">{ABOUT_TEXT.cta}</BookingButton>
			</header>
			{/* About Table Section - full width with proper spacing */}
			<section className="w-full my-6 sm:my-8">
				<AboutTable />
			</section>
			{/* Pricing Section */}
			<section className="w-full my-6 sm:my-8">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-theme">
					가격 안내
				</h2>
				<p className="text-lg mb-2">{ABOUT_TEXT.pricing}</p>
				<p className="mb-4 text-sm sm:text-base">
					{ABOUT_TEXT.pricing_description}
				</p>
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
