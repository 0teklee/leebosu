import { ErrorBoundary } from "./components/ErrorBoundary";
import { Layout } from "./components/layout/Layout";
import "./global.css";
import { Router } from "./router";

// <TransitionProvider> 페이지 이동 시 View Transition

function App() {
	return (
		<Layout>
			<ErrorBoundary>
				<Router />
			</ErrorBoundary>
		</Layout>
	);
}

export default App;
