import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-white flex items-center justify-center">
					<div className="text-center px-4">
						<h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
						<p className="text-lg mb-4">
							죄송합니다. 페이지를 표시하는 중에 문제가 발생했습니다.
						</p>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<pre className="text-left bg-gray-100 p-4 rounded-lg mb-4 overflow-auto max-w-2xl mx-auto text-sm">
								{this.state.error.toString()}
							</pre>
						)}
						<Link
							to="/"
							className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
						>
							홈으로 돌아가기
						</Link>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
