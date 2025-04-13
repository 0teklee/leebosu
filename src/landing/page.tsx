import { Button } from "@components/atom/Button";
import { PageLayout } from "@components/layout/PageLayout";
import { useBooking } from "@hooks/useBooking";
import { LANDING_TEXT } from "./constants";

function LandingPage() {
	const { openBooking } = useBooking();

	return (
		<PageLayout>
			{/* Hero Section */}
			<section className="py-12 mb-8 text-center bg-gradient-to-b from-theme/10 to-background rounded-xl shadow-sm">
				<div className="max-w-3xl mx-auto px-4">
					<h1 className="heading-1 mb-4">
						<span className="block text-theme">{LANDING_TEXT.title}</span>
						<span className="block mt-2 text-2xl font-bold">
							{LANDING_TEXT.subtitle}
						</span>
					</h1>
					<p className="paragraph text-lg mb-8">{LANDING_TEXT.description}</p>
					<Button
						fullWidth
						onClick={() => openBooking()}
						className="inline-block sm:max-w-sm transition-transform hover:scale-105"
						size="lg"
					>
						{LANDING_TEXT.cta}
					</Button>
				</div>
			</section>

			{/* Price Sample Section */}
			<section className="mb-12 bg-background rounded-xl p-6 shadow-sm">
				<h2 className="text-xl sm:text-2xl font-semibold mb-6 text-theme border-b pb-3">
					{LANDING_TEXT.priceTitle}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{LANDING_TEXT.prices.map((item, index) => (
						<div
							key={index}
							className="p-4 rounded-lg bg-background-secondary border border-secondary"
						>
							<p className="text-lg font-medium">
								{item.service}:{" "}
								<span className="text-theme font-bold">{item.price}</span>
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Profile Section */}
			<section className="bg-background rounded-xl p-6 shadow-sm">
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
			</section>
		</PageLayout>
	);
}

export default LandingPage;
