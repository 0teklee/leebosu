import { SERVICES } from "@/business";
import clsx from "clsx";
import { PRICE_NOTICE } from "../constants";
import { FormState } from "../types";
export default function PriceNotice({
	mainCategory,
}: {
	mainCategory: FormState["mainCategory"] | null;
}) {
	const mainService = mainCategory ? SERVICES[mainCategory] : null;
	const isCustomService = mainService?.custom;

	return (
		<>
			{
				<div
					className={clsx(
						"mb-4",
						"transition-all duration-200 ease-in-out",
						isCustomService ? "opacity-100 max-h-full" : "opacity-0 max-h-0"
					)}
				>
					<p className="text-lg text-theme font-medium">{PRICE_NOTICE.title}</p>
					<p className="text-secondary text-semibold">
						{PRICE_NOTICE.description}
					</p>
				</div>
			}
		</>
	);
}
