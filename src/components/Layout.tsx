import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto] bg-background">
			<Header />
			<main className="container-px">{children}</main>
			<footer className="bg-background-secondary self-end border-t border-text-secondary">
				<div className="container-px mx-auto max-w-4xl">
					<p className="text-center text-text-secondary">
						Leebosu.com <br />© {new Date().getFullYear()} All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
