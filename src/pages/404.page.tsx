import {Link} from "react-router-dom";
import {PageLayout} from "../components/layout/PageLayout.tsx";

export function NotFoundPage() {
	return (
		<PageLayout>
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
					<p className="text-lg mb-8">요청하신 페이지가 존재하지 않습니다.</p>
					<Link
						to="/"
						className="inline-block px-6 py-2 rounded-lg transition-colors"
					>
						홈으로 돌아가기
					</Link>
				</div>
			</div>
		</PageLayout>
	);
}
