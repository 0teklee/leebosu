import { interpolateAll, splitPathString } from "flubber";
import { useEffect, useRef } from "react";

type Props = {
	from: string;
	to: string;
	isOpen: boolean;
	className?: string;
	/** ms, default: 300ms */
	duration?: number;
};

// 기본 MorphIcon 컴포넌트 정의
function MorphIcon({ from, to, isOpen, className, duration = 300 }: Props) {
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const fromToArr = isOpen ? [from, to] : [to, from];

		if (pathRef.current) {
			// 초기 경로 설정
			pathRef.current.setAttribute("d", fromToArr[0]);
		}

		const rawPaths = fromToArr.map((p) => splitPathString(p));
		const maxLength = Math.max(rawPaths[0].length, rawPaths[1].length);

		/**
		 * @description
		 * 두 while 문의 목적: from, to에서 얻을 수 있는 svg path 갯수가 다를 경우,
		 * 갯수를 맞추기 위해 마지막 path를 복사
		 * @example
		 * 시작 경로: [A, B, C]
		 * 목표 경로: [D, E, F, G]
		 * 결과: [A, B, C, C] (마지막 C를 한 번 더 복사)
		 */
		const [startPaths, targetPaths] = rawPaths.map((paths) =>
			Array.from({ length: maxLength }, (_, i) => paths[i % paths.length])
		);

		// from, to의 숫자를 맞추고 나서, 모든 svg 벡터 path를 interpolate
		const interpolated = interpolateAll(startPaths, targetPaths, {
			single: true,
			string: true,
			maxSegmentLength: maxLength,
		});

		// 애니메이션 진행을 위한 외부 변수, 시작과 끝을 저장하기 위함
		let start: number | null = null,
			rafId: number | null = null;

		const animate = (timestamp: number) => {
			if (!start) start = timestamp;
			const elapsed = timestamp - start;
			const t = Math.min(elapsed / duration, 1);

			// NOTE: svg transition의 animation 진행 속도 제어
			// Number = 강도, t^3 = 처음에 천천히 시작, 끝에 빠르게 끝나도록 함
			const easedT = 10 * t * t * t;

			const newPath = interpolated(easedT);

			if (pathRef.current) {
				// path dom에 easedT 값을 추가하여 path 애니메이션 진행
				pathRef.current.setAttribute("d", newPath);
			}

			if (t < 1) {
				rafId = requestAnimationFrame(animate);
			}
		};

		rafId = requestAnimationFrame(animate);
		// 클린업 requestAnimationFrame이 있다면 cancelAnimationFrame을 호출, start, rafId 초기화
		return () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
			start = null;
			rafId = null;
		};
	}, [from, to, isOpen, duration]);

	// SVG 마크업만 반환하고, ClientOnly 래퍼는 HOC에서 처리
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={`w-6 h-6${className || ""}`}
		>
			<path ref={pathRef} />
		</svg>
	);
}

export default MorphIcon;
