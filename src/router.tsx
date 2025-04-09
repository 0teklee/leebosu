import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./pages/404.page";
import { AboutPage } from "./pages/about.page";
import { BookingPage } from "./pages/booking.page";
import { IndexPage } from "./pages/index.page";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/book" element={<BookingPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
