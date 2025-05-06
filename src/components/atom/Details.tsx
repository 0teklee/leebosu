import { ChevronIcon } from "@/components/icons/ChevronIcon";
import clsx from "clsx";

export default function Details({
	title,
	children,
	detailsClassName,
	summaryClassName,
	height = "h-30",
	props,
}: {
	title: string;
	children: React.ReactNode;
	height?: `h-${number | string}`;
	detailsClassName?: string;
	summaryClassName?: string;
	props?: React.ComponentProps<"details">;
}) {
	return (
		<details
			className={clsx(
				"group",
				"after:content-[''] after:block after:h-0 after:border-b after:border-theme/20 after:pb-4",
				height,
				detailsClassName
			)}
			{...props}
		>
			<summary
				className={clsx(
					"flex justify-between items-center cursor-pointer list-none py-2 text-xl sm:text-2xl font-semibold text-theme transition-colors",
					summaryClassName
				)}
			>
				{title}
				<ChevronIcon className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
			</summary>
			<div
				className={clsx("overflow-y-auto", "pt-4 px-2 sm:px-4", "origin-top")}
			>
				{children}
			</div>
		</details>
	);
}
