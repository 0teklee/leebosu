import BookingButton from "@/components/CTAButton";
import { Layout } from "@/components/layout/Layout";
import Table from "@/domains/about/Table";
import { PageLayout } from "@components/layout/PageLayout";
import { ABOUT_TEXT } from "./constants";
import Details from "./Details";

function AboutPage() {
	return (
		<Layout>
			<PageLayout className="flex flex-col container *:lg:w-4xl items-center">
				{/* Hero Section - Updated Layout */}
				<header className="w-full flex flex-col items-center gap-y-6 my-8 md:my-12 text-center">
					<h1 className="text-theme text-2xl sm:text-3xl md:text-4xl font-bold">
						{ABOUT_TEXT.subtitle}
					</h1>
					<p className="text-lg max-w-prose">{ABOUT_TEXT.bio}</p>
					<BookingButton size="lg" className="mt-2">
						{ABOUT_TEXT.cta}
					</BookingButton>
					<div className="relative w-full max-w-2xl overflow-hidden rounded-lg shadow-lg mt-4">
						<img
							className="w-full aspect-video object-cover"
							src="/about-hero.JPG"
							alt="이보수 소개"
							fetchPriority="high"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
					</div>
				</header>
				{/* Content Sections - Adjusted Spacing & Layout */}
				<div className="w-full grid gap-8 sm:gap-12 mt-12 animate-dynamic-delay">
					{/* About Table Section - Adjusted Spacing */}
					<section className="w-full my-4">
						<Table />
					</section>
					{/* Pricing Section - Converted */}
					<section className="w-full">
						<Details title="가격 안내">
							<p className="text-lg text-theme font-medium mb-3">
								{ABOUT_TEXT.pricing}
							</p>
							<p>{ABOUT_TEXT.pricing_description}</p>
						</Details>
					</section>
					{/* Bio Section - Converted (Using different text key for content) */}
					<section className="w-full">
						<Details title="경력 상세">
							<p className="text-lg font-medium mb-3">{ABOUT_TEXT.bio}</p>
						</Details>
					</section>

					{/* Service Area Section - Converted */}
					<section className="w-full">
						<Details title="서비스 지역">
							<p className="text-lg text-theme font-medium mb-3">
								{ABOUT_TEXT.service_area}
							</p>
						</Details>
					</section>

					{/* Bottom CTA Section - Adjusted Spacing */}
					<div className="flex justify-center w-full mt-8 mb-12">
						<BookingButton size="lg" className="shadow-lg">
							{ABOUT_TEXT.cta}
						</BookingButton>
					</div>
				</div>
			</PageLayout>
		</Layout>
	);
}

export default AboutPage;
