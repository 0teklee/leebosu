import { useEffect, useState } from "react";

export function useMounted() {
	const [isMounted, setIsMounted] = useState(false);
	const isServer = typeof window === "undefined";

	useEffect(() => {
		setIsMounted(true);
	}, [isServer]);

	return isMounted;
}
