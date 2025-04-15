import BookingDialog from "@/booking/page.tsx";
import { useBooking } from "@/hooks/useBooking.ts";
import { ReactNode } from "react";
import Footer from "../Footer.tsx";
import { Header } from "../header/Header.tsx";

if (typeof window !== "undefined") {
	import("@/global.css");
}

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	const { isBookingOpen } = useBooking();

	return (
		<div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
			<Header />
			<main>{children}</main>
			<Footer />
			{isBookingOpen && <BookingDialog />}
		</div>
	);
}
