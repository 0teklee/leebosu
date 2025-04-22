import { SERVICES } from "@/business";
import BookingButton from "@/components/CTAButton";
import { Layout } from "@/components/layout/Layout";
import { PageLayout } from "@components/layout/PageLayout";
import clsx from "clsx";
import { LANDING_TEXT } from "./constants";

function MainPage() {
	return (
		<Layout>
			<PageLayout className="flex flex-col container *:lg:w-4xl items-center">
				<section
					className={clsx(
						"flex flex-col items-center gap-y-6",
						"w-full py-12 my-8 md:my-12 text-center",
						"lg:flex-row lg:gap-x-12"
					)}
				>
					<img
						className="w-full h-auto sm:max-w-lg rounded-lg shadow-md"
						src="/main-hero.jpg"
						alt="main-hero"
					/>
					<div className="max-w-2xl mx-auto px-4 animate-slide-fade-in-down anim-duration-50">
						<p className="mb-2 text-secondary text-lg">{LANDING_TEXT.intro}</p>
						<h1 className="mb-4 text-theme text-3xl sm:text-4xl md:text-5xl font-bold">
							{LANDING_TEXT.title}
						</h1>
					</div>
				</section>
				<section className="w-full flex flex-col items-center gap-6 mb-12 md:mb-16">
					<ol className="list-decimal list-inside text-secondary text-base space-y-2 max-w-prose text-center">
						{LANDING_TEXT.description.map((description) => (
							<li key={description}>{description}</li>
						))}
					</ol>
					<BookingButton className="inline-block sm:max-w-sm mt-4" size="lg">
						{LANDING_TEXT.cta}
					</BookingButton>
				</section>
				{/* Services Section - Simplified Card Style */}
				<section className="w-full mb-12 md:mb-16">
					{/* Title style similar to Details summary */}
					<h2 className="text-xl sm:text-2xl font-semibold mb-6 text-theme border-b border-theme/20 pb-3">
						{LANDING_TEXT.serviceTitle}
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
						{Object.entries(SERVICES).map(([key, category]) => (
							// Simplified card: removed bg-secondary, shadow, hover; added border
							<div key={key} className="border border-secondary rounded-lg p-4">
								{/* Consistent header style */}
								<h3 className="text-lg font-semibold text-theme mb-3 border-b border-theme/20 pb-2">
									{category.name}
								</h3>
								<ul className="space-y-2">
									{category.subCategories.slice(0, 3).map((subCategory) => (
										<li
											key={subCategory}
											// Use text-primary for list items
											className="text-primary flex items-center text-sm"
										>
											<span className="h-1.5 w-1.5 rounded-full bg-theme mr-2"></span>
											{subCategory}
										</li>
									))}
									{category.subCategories.length > 3 && (
										<li className="text-secondary text-xs mt-2">
											외 {category.subCategories.length - 3}개 서비스
										</li>
									)}
								</ul>
							</div>
						))}
					</div>
					{/* Consistent Button spacing */}
					<div className="max-w-md mx-auto mt-6">
						<BookingButton className="text-base" size="md" fullWidth>
							{LANDING_TEXT.cta} {/* Use consistent CTA text */}
						</BookingButton>
					</div>
				</section>

				{/* Profile Section */}
				{/* <section className="bg-background rounded-xl p-6 shadow-sm">
				<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-theme border-b pb-3">
					{LANDING_TEXT.contactTitle}
				</h2>
				<div className="flex flex-col sm:flex-row gap-4 items-center">
					<div className="w-24 h-24 bg-background-secondary rounded-full flex items-center justify-center">
						<span className="text-2xl font-bold text-theme">이보수</span>
					</div>
					<div className="flex-1">
						<p className="text-lg mb-2">{LANDING_TEXT.contactMethod}</p>
						<p className="text-lg text-theme font-medium">
							{LANDING_TEXT.serviceArea}
						</p>
					</div>
				</div>
			</section> */}
			</PageLayout>
		</Layout>
	);
}

export default MainPage;
