import {ReactNode} from "react";
import {Header} from "../header/Header.tsx";
import Footer from "../Footer.tsx";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
			<Header />
			<main>{children}</main>
			<Footer/>
		</div>
	);
}
