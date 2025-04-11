import { BookingProvider } from "./booking/BookingContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Layout } from "./components/layout/Layout.tsx";
import "./global.css";
import { Router } from "./router";

// <TransitionProvider> 페이지 이동 시 View Transition

function App() {
	return (
		<BookingProvider>
			<Layout>
				<ErrorBoundary>
					<Router />
				</ErrorBoundary>
			</Layout>
		</BookingProvider>
	);
}

export default App;
