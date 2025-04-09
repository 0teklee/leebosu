import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
			<Header />
			<main>{children}</main>
			<footer className="bg-background-secondary self-end py-4 sm:py-2 border-t border-text-secondary">
				<div className="space-y-1 text-center text-text-secondary">
					<p className="text-sm upper">Leebosu.com</p>
					<p className="text-xs">
						© {new Date().getFullYear()} All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
