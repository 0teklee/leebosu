// 필요 시 유지
import "ignore-styles";

import fs from "fs";
import module from "module";
import moduleAlias from "module-alias";
import path from "path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import "tsconfig-paths/register";

// 전역으로 require 정의
const require = module.createRequire(import.meta.url);

async function main() {
	// 이 모듈 컨텍스트에 맞는 require 함수 생성
	const projectRoot = process.cwd();

	console.info("[0-SSG_시작]: 📦 SSG 빌드 스크립트 시작...", projectRoot);

	// --- module-alias를 사용한 모킹 설정 ---
	const mockFlubberPath = path.join(projectRoot, "mock-flubber.js");
	fs.writeFileSync(
		mockFlubberPath,
		`
// flubber에 대한 모의 구현
exports.interpolateAll = function mockInterpolateAll() {
  return () => ""; // 빈 문자열을 반환하는 더미 함수 반환
};

exports.splitPathString = function mockSplitPathString(path) {
  return [path]; // 입력을 배열로 반환
};
// 필요한 경우 다른 flubber export 추가
`
	);

	// 'flubber'에서 모의 파일로의 별칭 추가

	moduleAlias.addAlias("flubber", mockFlubberPath);

	// 페이지 컴포넌트를 require하기 *전에* 별칭 적용
	try {
		moduleAlias(); // Initialize aliases
		console.info("[1-모듈_별칭_설정]: ✅ 'flubber' 모듈 별칭 설정 완료.");
	} catch (error: unknown) {
		console.error(
			"❌ Error initializing module-alias:",
			error instanceof Error ? error.message : String(error)
		);
		process.exit(1); // Exit if alias setup fails
	}

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
		// 모듈 별칭 초기화 - flubber가 실제 라이브러리를 사용하도록 복원
		try {
			// Module-alias는 직접적인 removeAlias 메서드를 제공하지 않으므로 다른 방법으로 처리
			// 노드의 모듈 캐시에서 flubber 관련 항목 제거
			// 다음 require('flubber')는 실제 패키지를 찾게 됨
			Object.keys(require.cache).forEach((cacheKey) => {
				if (cacheKey.includes("flubber") || cacheKey.includes("mock-flubber")) {
					delete require.cache[cacheKey];
					console.info(`[4-캐시_제거]: 모듈 캐시 제거: ${cacheKey}`);
				}
			});

			console.info(
				"[4-모듈_초기화]: ✅ 'flubber' 모듈 초기화 완료. 실제 라이브러리 사용 가능."
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
				"⚠️ 모듈 초기화 중 오류:",
				error instanceof Error ? error.message : String(error)
			);
		}

		// 기존 정리 작업 유지
		cleanUpMockFile();
	});

/** util 함수 */

function generateScriptTags(vendorJsFile?: string) {
	let scriptTags = "";
	if (vendorJsFile) {
		scriptTags += `<script type="module" src="/assets/${vendorJsFile}"></script>`;
	}
	// Always use main.js
	scriptTags += `<script type="module" src="/assets/main.js"></script>`;
	return scriptTags;
}

function cleanUpMockFile() {
	// Clean up the mock file
	try {
		const projectRoot = process.cwd();
		const mockFlubberPath = path.resolve(projectRoot, "mock-flubber.js");
		fs.unlinkSync(mockFlubberPath);
		console.info(
			`[5-모의_파일_정리]: 🧹 모의 파일 정리 완료: ${mockFlubberPath}`
		);
	} catch (error: unknown) {
		console.warn(
			"⚠️ Could not clean up mock file:",
			error instanceof Error ? error.message : String(error)
		);
	}
}
