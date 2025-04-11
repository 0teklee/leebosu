import { Route, Routes } from "react-router-dom";
import BookingDialog from "./booking/BookingDialog";
import { NotFoundPage } from "./pages/404.page";
import { Page as AboutPage } from "./pages/about.page";
import { IndexPage } from "./pages/index.page";

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="*" element={<NotFoundPage />} />
			<Route path="/booking" element={<BookingDialog />} />
		</Routes>
	);
}
