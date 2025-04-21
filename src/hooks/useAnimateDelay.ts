import { useRef, useState } from "react";

const durationClassMap = {
	0: "",
	50: "anim-duration-50",
	100: "anim-duration-100",
	150: "anim-duration-150",
	200: "anim-duration-200",
	250: "anim-duration-250",
	300: "anim-duration-300",
	350: "anim-duration-350",
	400: "anim-duration-400",
	500: "anim-duration-500",
	700: "anim-duration-700",
} as const;

export type DurationKeyType = keyof typeof durationClassMap;
export type DurationValueType = (typeof durationClassMap)[DurationKeyType];

const useAnimateDelay = (
	delay: DurationKeyType = 500
): [boolean, (action: () => void) => void, DurationValueType] => {
	const [isUnmountAnimate, setIsAnimate] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const startAnimate = (action: () => void) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setIsAnimate(true);
		timeoutRef.current = setTimeout(() => {
			action();
			setIsAnimate(false);
		}, delay);
	};

	return [isUnmountAnimate, startAnimate, durationClassMap[delay]];
};

export default useAnimateDelay;
