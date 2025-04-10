import { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
	return (
		<div className="w-full px-4 py-6 sm:px-6 sm:py-8">
			{title && <h1 className="mb-6 sm:mb-8 text-center heading-1">{title}</h1>}
			<div className="*:opacity-0 *:animate-slide-fade-in-up animate-dynamic-delay *:anim-duration-1000 *:anim-fill-forwards">
				{children}
			</div>
		</div>
	);
}
