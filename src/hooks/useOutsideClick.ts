import { useEffect } from "react";

const useOutsideClick = (
	ref: React.RefObject<HTMLElement | null>,
	callback: () => void
) => {
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("click", (e) => handleOutsideClick(e));
		return () => {
			document.removeEventListener("click", (e) => handleOutsideClick(e));
		};
	}, [ref, callback]);
};

export default useOutsideClick;
