import BookingDialog from "@/domains/book/page";
import {useBooking} from "@/hooks/useBooking";
import Footer from "@components/Footer";
import {Header} from "@/components/header";
import {ReactNode} from "react";

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
