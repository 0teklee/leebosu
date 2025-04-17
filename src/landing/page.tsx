import { SERVICES } from "@/business";
import BookingButton from "@/components/BookingButton";
import { PageLayout } from "@components/layout/PageLayout";
import { LANDING_TEXT } from "./constants";

function LandingPage() {
	return (
		<PageLayout>
			{/* Hero Section */}
			<section className="py-12 mb-8 text-center bg-gradient-to-b from-theme/10 to-background rounded-xl shadow-sm">
				<div className="max-w-3xl mx-auto px-4">
					<p className="mb-2 text-secondary text-lg">{LANDING_TEXT.intro}</p>
					<h1 className="mb-4 text-theme">{LANDING_TEXT.title}</h1>
					<p className="paragraph text-lg mb-8">{LANDING_TEXT.description}</p>
					<BookingButton
						fullWidth
						className="inline-block sm:max-w-sm hover:scale-105 duration-200"
						size="lg"
					>
						{LANDING_TEXT.cta}
					</BookingButton>
				</div>
			</section>

			{/* Price Sample Section */}
			<section className="mb-12 bg-background rounded-xl p-6 shadow-sm">
				<h2 className="text-xl sm:text-2xl font-semibold mb-6 text-theme border-b pb-3">
					{LANDING_TEXT.serviceTitle}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{Object.entries(SERVICES).map(([key, category]) => (
						<div
							key={key}
							className="bg-background-secondary rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
						>
							<h3 className="text-lg font-semibold text-theme mb-3 border-b border-theme/20 pb-2">
								{category.name}
							</h3>
							<ul className="space-y-2">
								{category.subCategories.slice(0, 3).map((subCategory) => (
									<li
										key={subCategory}
										className="text-primary flex items-center"
									>
										<span className="h-1.5 w-1.5 rounded-full bg-theme mr-2"></span>
										{subCategory}
									</li>
								))}
								{category.subCategories.length > 3 && (
									<li className="text-secondary text-sm mt-2">
										외 {category.subCategories.length - 3}개 서비스
									</li>
								)}
							</ul>
						</div>
					))}
				</div>
				<div className="max-w-lg mx-auto mt-4">
					<BookingButton
						className="mt-4 text-sm hover:scale-105 duration-200"
						fullWidth
					>
						서비스 예약하기
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
	);
}

export default LandingPage;
