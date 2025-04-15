// import "@/global.css"; 
import DevError from "@/components/DevError";
import { Layout } from "@layout/Layout";
import { PageLayout } from "@layout/PageLayout";

export default function ErrorPage() {
	const error = new Error("오류가 발생했습니다");
	return (
		<Layout>
			<PageLayout>
				<div className="text-center px-4">
					<h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
					<p className="text-lg mb-4">
						죄송합니다. 페이지를 표시하는 중에 문제가 발생했습니다.
					</p>
					<DevError error={error} />
					<a
						href="/"
						className="inline-block  px-6 py-2 rounded-lg transition-colors"
					>
						홈으로 돌아가기
					</a>
				</div>
			</PageLayout>
		</Layout>
	);
}
