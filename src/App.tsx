import { ErrorBoundary } from "./components/ErrorBoundary";
import { Layout } from "./components/Layout";
import { TransitionProvider } from "./components/TransitionProvider";
import "./global.css";
import { Router } from "./router";

function App() {
	return (
		<ErrorBoundary>
			<TransitionProvider>
				<Layout>
					<Router />
				</Layout>
			</TransitionProvider>
		</ErrorBoundary>
	);
}

export default App;
