import "ignore-styles";

import fs from "fs";
import module from "module";
import path from "path";
import {createElement} from "react";
import {renderToString} from "react-dom/server";
import "tsconfig-paths/register";

// 클라이언트 의존성 모킹 : 서버환경에서 실행되는 ssg.ts가 리액트 파일을 읽을 때, 외부 의존성 import를 모킹해야함
// 원인: *.tsx 파일 읽을 시, import 의존성이 정적으로 먼저 평가됨 -> 서버사이드에서 클라이언트 의존성을 읽으려 하여 에러
const require = new Proxy(module.createRequire(import.meta.url), {
	apply(
		target: NodeJS.Require,
		thisArg: unknown,
		args: [string, ...unknown[]]
	) {
		try {
			return target.apply(thisArg, args as [id: string]);
		} catch (e) {
			return args[0].includes("node_modules") ?? {};
		}
	},
});

async function main() {
	const projectRoot = process.cwd();

	console.info("[0-SSG_시작]: 📦 SSG 빌드 스크립트 시작...", projectRoot);

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
	// TODO: 추후 벤더 스크립트 추가 시 사용
	// const vendorJsFile = jsFiles.find((file) => file.startsWith("vendor."));

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
	// --- 페이지 정의 (src 경로 사용) ---
	const pages = [
		{ name: "index", path: "src/domains/main/page.tsx" },
		{ name: "about", path: "src/domains/about/page.tsx" },
		{ name: "error", path: "src/domains/fallbacks/error.page.tsx" },
		{ name: "404", path: "src/domains/fallbacks/404.page.tsx" },
	];

	console.info(`[2-렌더링_시작]: 📄 ${pages.length}개 페이지 렌더링 시작...`);

	for (const { name, path: pagePath } of pages) {
		try {
			const resolvedPagePath = path.resolve(projectRoot, pagePath);
			const PageComponent = require(resolvedPagePath).default;

			if (!PageComponent) {
				throw new Error(`Component not found in ${resolvedPagePath}`);
			}

			const html = renderToString(createElement(PageComponent));
			const outputPath = path.resolve(
				projectRoot,
				"dist",
				`${name === "index" ? "index" : name}.html`
			);

			// HTML 파일 업데이트
			const baseHtml = fs.readFileSync(outputPath, "utf-8");
			const updatedHtml = baseHtml.replace(
				'<div id="root"></div>',
				`<div id="root">${html}</div><script type="module" src="../assets/main.js"></script>`
			);

			fs.writeFileSync(outputPath, updatedHtml);
			console.info(
				`[3-페이지_렌더링_성공]: ✅ ${name} 렌더링 완료 → ${outputPath}`
			);
		} catch (error) {
			// 에러 시 404 페이지로 폴백
			const NotFoundPage = require(path.resolve(
				projectRoot,
				"src/pages/404.page.tsx"
			)).default;

			const fallbackHtml = renderToString(createElement(NotFoundPage));
			const outputPath = path.resolve(
				projectRoot,
				"dist",
				`${name === "index" ? "index" : name}.html`
			);

			const baseHtml = fs.readFileSync(outputPath, "utf-8");
			const fallbackContent = baseHtml.replace(
				'<div id="root"></div>',
				`<div id="root">${fallbackHtml}</div><script type="module" src="../assets/main.js"></script>`
			);

			fs.writeFileSync(outputPath, fallbackContent);
			console.info(
				`[2-폴백_렌더링]: ⚠️ NotFoundPage ${name} 폴백 렌더링 완료 → ${outputPath}`
			);
		}
	}

	console.info("[6-스크립트_완료]: ===== SSG 빌드 스크립트 완료 =====");
}

// 스크립트 실행
main().catch((error) => {
	console.error("SSG 빌드 중 오류 발생:", error);
	process.exit(1);
});
