import Table from "@/components/atom/Table";
import BookingButton from "@/components/CTAButton";
import { Layout } from "@/components/layout/Layout";
import { PageLayout } from "@components/layout/PageLayout";
import clsx from "clsx";
import Details from "../../components/atom/Details";
import { ABOUT_TEXT, SERVICE_TABLE_ITEMS } from "./constants";

function AboutPage() {
	return (
		<Layout>
			<PageLayout className="flex flex-col container *:lg:w-4xl items-center">
				<header className="w-full flex flex-col items-center gap-y-6 my-8 md:my-12 text-center">
					<h1 className="text-theme text-2xl sm:text-3xl md:text-4xl font-bold break-after-auto">
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
				<div
					className={clsx(
						"grid gap-8 sm:gap-12",
						"w-full mt-12",
						"*:not-first:max-h-[30dvh] *:not-first:overflow-y-auto",
						"*:not-first:scroll-auto *:not-first:overflow-x-hidden"
					)}
				>
					<section className="w-full my-4">
						<Table>
							<Table.Head>
								<Table.Row>
									<Table.Cell header>서비스 대분류</Table.Cell>
									<Table.Cell header>서비스 소분류</Table.Cell>
								</Table.Row>
							</Table.Head>
							<Table.Body>
								{SERVICE_TABLE_ITEMS.map((item, idx) => (
									<Table.Row key={idx}>
										<Table.Cell>{item.service}</Table.Cell>
										<Table.Cell>
											<div className="flex flex-col gap-1">
												{item.subCategories.map((sub) => (
													<span key={sub} className="text-sm">
														{sub}
													</span>
												))}
											</div>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</section>
					<section className="w-full">
						<Details title="가격 안내" height="h-full" props={{ open: true }}>
							<p className="text-lg text-theme font-medium mb-3">
								{ABOUT_TEXT.pricing}
							</p>
							<ul className={`list-disc list-inside`}>
								{ABOUT_TEXT.pricing_description.map((description, index) => (
									<li
										className={index === 0 ? "text-theme font-medium" : ""}
										key={index}
									>
										{description}
									</li>
								))}
							</ul>
						</Details>
					</section>
					<section className="w-full">
						<Details title="서비스 지역" height="h-full" props={{ open: true }}>
							<p className="text-lg text-theme font-medium mb-3">
								{ABOUT_TEXT.service_area}
							</p>
						</Details>
					</section>
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
