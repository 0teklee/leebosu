// 필요 시 유지
import "ignore-styles";

import fs from "fs";
import module from "module";
import path from "path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import "tsconfig-paths/register";

// 전역으로 require 정의
const require = module.createRequire(import.meta.url);

// 외부 라이브러리(flubber) 모킹 설정
console.info("[1-모킹_설정]: flubber 모듈 모킹 설정 시작...");

// 훨씬 간단한 접근법: 노드 모듈 캐시에 직접 모의 구현 삽입
require.cache["node_modules/flubber/index.js"] = {
	id: "node_modules/flubber/index.js",
	filename: "node_modules/flubber/index.js",
	loaded: true,
	exports: {
		interpolateAll: () => () => "",
		splitPathString: (path: string) => [path],
		// 필요한 경우 다른 flubber 함수 추가
	},
} as unknown as NodeJS.Module;

require.cache["node_modules/twilio/index.js"] = {
	id: "node_modules/twilio/index.js",
	filename: "node_modules/twilio/index.js",
	loaded: true,
	exports: {
		twiml: () => ({
			say: () => ({
				toString: () => "",
			}),
		}),
	},
} as unknown as NodeJS.Module;
console.info("[1-모킹_설정_완료]: ✅ flubber 모듈 모킹 설정 완료.");

async function main() {
	const projectRoot = process.cwd();

	console.info("[0-SSG_시작]: 📦 SSG 빌드 스크립트 시작...", projectRoot);

	// --- 페이지 정의 (경로 사용) ---
	const pages = [
		{ name: "index", path: "src/pages/index.page.tsx" },
		{ name: "about", path: "src/pages/about.page.tsx" },
		{ name: "error", path: "src/pages/error.page.tsx" },
		{ name: "404", path: "src/pages/404.page.tsx" },
	];

	// --- 에셋 처리 ---
	const assetsDir = path.resolve(projectRoot, "dist/assets");
	let assetFiles: string[] = [];
	try {
		assetFiles = fs.readdirSync(assetsDir);
	} catch (error: unknown) {
		console.warn(
			`⚠️ Warning: Could not read assets directory ${assetsDir}. Script tags might be missing.`,
			error instanceof Error ? error.message : String(error)
		);
	}
	console.info("[1.2-asset-imports]", assetFiles);

	const jsFiles = assetFiles.filter((file) => file.endsWith(".js"));
	// const vendorJsFile = jsFiles.find((file) => file.startsWith("vendor."));

	// Delete any main2.js, main3.js, etc. files
	jsFiles.forEach((file) => {
		if (file.match(/^main\d+\.js$/)) {
			try {
				const filePath = path.join(assetsDir, file);
				fs.unlinkSync(filePath);
				console.info(`[1.3-파일정리] 불필요한 JS 파일 삭제: ${file}`);
			} catch (err) {
				console.warn(`⚠️ 파일 삭제 실패: ${file}`, err);
			}
		}
	});

	// --- 렌더링 루프 ---
	console.info(`[2-렌더링_시작]: 📄 ${pages.length}개 페이지 렌더링 시작...`);

	for (let i = 0; i < pages.length; i++) {
		const { name, path: pagePath } = pages[i];
		try {
			// 스크립트 디렉토리 기준으로 경로 확인
			const resolvedPagePath = path.resolve(projectRoot, pagePath);

			// module.createRequire로 생성된 require 사용
			// PageComponent 내부에서 require('flubber') 호출 시 module-alias가 가로챔
			const PageComponent = require(resolvedPagePath).default;

			console.info(`[2.1-PageComponent]:${i}`, PageComponent);

			if (!PageComponent) {
				throw new Error(
					`Component not found or not default exported from ${resolvedPagePath}`
				);
			}
			const App = createElement(PageComponent);
			const appHtml = renderToString(App);

			console.info(`[3-renderToString-페이지_렌더링_성공]: ✅ `);

			const outputName = name === "index" ? "index.html" : `${name}.html`;
			const outputPath = path.resolve(projectRoot, "dist", outputName); // projectRoot/dist에 출력

			const baseHtml = fs.readFileSync(outputPath, "utf-8");

			const SSG_HTML = baseHtml.replace(
				'<div id="root"></div>',
				`<div id="root">${appHtml}</div><script type="module" src="../assets/main.js"></script>`
			);

			fs.mkdirSync(path.dirname(outputPath), { recursive: true });
			fs.writeFileSync(outputPath, SSG_HTML, "utf-8");
			console.info(
				`[3-페이지_렌더링_성공]: ✅ ${name} 렌더링 완료 → ${outputPath}`
			);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			console.warn(
				`⚠️ [2-${name}:${i + 1}번째 페이지] ${pagePath}:`,
				errorMessage
			);

			const NotFoundPage = require(path.resolve(
				projectRoot,
				"src/pages/404.page.tsx"
			)).default;

			const fallbackHtml = renderToString(NotFoundPage);

			const outputName = name === "index" ? "index.html" : `${name}.html`;
			const outputPath = path.resolve(projectRoot, "dist", outputName);

			try {
				const fallbackTemplate = fs.readFileSync(outputPath, "utf-8");

				const html = fallbackTemplate.replace(
					'<div id="root"></div>',
					`<div id="root">${fallbackHtml}</div><script type="module" src="../assets/main.js"></script>`
				);

				fs.mkdirSync(path.dirname(outputPath), { recursive: true });
				fs.writeFileSync(outputPath, html, "utf-8");
				console.info(
					`[2-폴백_렌더링]: ⚠️ NotFoundPage ${name} 폴백 렌더링 완료 → ${outputPath}`
				);
			} catch (innerError) {
				console.error(`❌ 폴백 렌더링 실패: ${outputPath}`, innerError);
			}
		}
	}

	console.info("[6-스크립트_완료]: ===== SSG 빌드 스크립트 완료 =====");
}

// 스크립트 실행
main()
	.catch((error) => {
		console.error("SSG 빌드 중 오류 발생:", error);
		process.exit(1);
	})
	.finally(() => {
		// 모킹 정리
		try {
			// 모듈 캐시에서 flubber 모킹 제거
			delete require.cache["node_modules/flubber/index.js"];
			delete require.cache["node_modules/twilio/index.js"];
			console.info(
				"[4-모킹_정리]: ✅ flubber 모듈 캐시 정리 완료. 실제 라이브러리 사용 가능."
			);

			// 패키지 의존성 확인
			const packageJsonPath = path.resolve(process.cwd(), "package.json");
			if (fs.existsSync(packageJsonPath)) {
				const packageJson = JSON.parse(
					fs.readFileSync(packageJsonPath, "utf-8")
				);
				if (
					!packageJson.dependencies?.flubber &&
					!packageJson.devDependencies?.flubber
				) {
					console.warn(
						"⚠️ 'flubber' 패키지가 dependencies에 없습니다. 'yarn add flubber'로 설치하세요."
					);
				}
			}
		} catch (error) {
			console.warn(
				"⚠️ 모듈 정리 중 오류:",
				error instanceof Error ? error.message : String(error)
			);
		}
	});
