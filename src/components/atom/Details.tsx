import { ChevronIcon } from "@/components/icons/ChevronIcon";
import useAnimateDelay from "@/hooks/useAnimateDelay";
import clsx from "clsx";
import { useState } from "react";

export default function Details({
	title,
	children,
	detailsClassName,
	summaryClassName,
	height = "h-30",
}: {
	title: string;
	children: React.ReactNode;
	height?: `h-${number | string}`;
	detailsClassName?: string;
	summaryClassName?: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isExitAnimate, triggerAnim, animDuration] = useAnimateDelay(200);

	return (
		<details
			open={isOpen}
			onClick={(e) => {
				e.preventDefault();
				triggerAnim(() => {
					setIsOpen((prev) => !prev);
				});
			}}
			className={clsx(
				"group after:content-[''] after:block after:h-0 after:border-b after:border-theme/20 after:pb-4",
				height,
				detailsClassName
			)}
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
			{isOpen && (
				<div
					className={clsx(
						"overflow-y-auto",
						"pt-4 px-2 sm:px-4",
						"origin-top anim-direction-alternate anim-timing-ease-in-out",
						animDuration,
						isExitAnimate
							? "animate-slide-fade-out-up -z-10"
							: "animate-slide-fade-in-up z-0"
					)}
				>
					{children}
				</div>
			)}
		</details>
	);
}
