import { Route, Routes, useLocation } from "react-router-dom";
import BookingDialog from "./booking/page";
import { NotFoundPage } from "./pages/404.page";
import { Page as AboutPage } from "./pages/about.page";
import { IndexPage } from "./pages/index.page";
export function Router() {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	return (
		<>
			<Routes location={state?.backgroundLocation || location}>
				<Route path="/" element={<IndexPage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			{state?.backgroundLocation && (
				<Routes>
					<Route path="/booking" element={<BookingDialog />} />
				</Routes>
			)}
		</>
	);
}
