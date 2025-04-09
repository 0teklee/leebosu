import { Link } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { documentPropsError } from "../utils/pageMetadata";

export function Page({ error }: { error?: Error }) {
	return (
		<PageLayout>
			<div className="text-center px-4">
				<h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
				<p className="text-lg mb-4">
					죄송합니다. 페이지를 표시하는 중에 문제가 발생했습니다.
				</p>
				{process.env.NODE_ENV === "development" && error && (
					<pre className="text-left  p-4 rounded-lg mb-4 overflow-auto max-w-2xl mx-auto text-sm">
						{error.toString()}
					</pre>
				)}
				<Link
					to="/"
					className="inline-block  px-6 py-2 rounded-lg transition-colors"
				>
					홈으로 돌아가기
				</Link>
			</div>
		</PageLayout>
	);
}

// SSR error handling

export function onBeforeRender(pageContext: { error?: Error }) {
	const { error } = pageContext;
	if (error) {
		return {
			pageContext: {
				documentProps: documentPropsError,
				error,
				statusCode: 500,
			},
		};
	}
	return {
		pageContext: {
			documentProps: documentPropsError,
			statusCode: 500,
		},
	};
}
