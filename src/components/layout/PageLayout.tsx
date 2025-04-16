import clsx from "clsx";
import { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	title?: string;
	className?: string;
}

export function PageLayout({ children, title, className }: PageLayoutProps) {
	return (
		<div className={`w-full px-4 py-6 sm:px-16 sm:py-8 lg:px-36`}>
			{title && <h1 className="mb-6 sm:mb-8 text-center heading-1">{title}</h1>}
			<div
				className={clsx(
					"*:opacity-0 *:animate-slide-fade-in-up animate-dynamic-delay *:anim-duration-1000 *:anim-fill-forwards",
					className
				)}
			>
				{children}
			</div>
		</div>
	);
}
