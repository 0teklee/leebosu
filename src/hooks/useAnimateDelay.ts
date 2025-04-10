import { useRef, useState } from "react";

const useAnimateDelay = (
	delay = 500
): [boolean, (action: () => void) => void] => {
	const [isAnimate, setIsAnimate] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const startAnimate = (action: () => void) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);

		setIsAnimate(true);
		timeoutRef.current = setTimeout(() => {
			action();
			setIsAnimate(false);
		}, delay);
	};

	return [isAnimate, startAnimate];
};

export default useAnimateDelay;
