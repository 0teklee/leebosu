import { useEffect, useState } from "react";

import { useMounted } from "./useMounted";
export function useBooking() {
	const isMounted = useMounted();
	const [isBookingOpen, setIsBookingOpen] = useState(false);

	useEffect(() => {
		if (!isMounted || typeof window === "undefined") return;

		const syncFromUrl = () => {
			const isBookingPath = window.location.pathname.startsWith("/booking");
			setIsBookingOpen(isBookingPath);
		};

		// Initial sync
		syncFromUrl();

		// Listen for URL changes through custom event and popstate
		window.addEventListener("urlchange", syncFromUrl);
		window.addEventListener("popstate", syncFromUrl);

		return () => {
			window.removeEventListener("urlchange", syncFromUrl);
			window.removeEventListener("popstate", syncFromUrl);
		};
	}, [isMounted]);

	const openBooking = (initialStep = 0) => {
		if (!isMounted) return;

		// Update URL without page reload
		const url = new URL(window.location.href);
		url.pathname = "/booking";
		url.searchParams.set("step", String(initialStep));

		window.history.pushState(
			{ backgroundLocation: window.location.href },
			"",
			url.toString()
		);

		window.dispatchEvent(new Event("urlchange"));
	};

	const closeBooking = () => {
		if (!isMounted) return;

		const state = history.state as { backgroundLocation?: string };
		let targetUrl = state?.backgroundLocation || "/";

		// Remove step parameter if present
		if (targetUrl.includes("?step=")) {
			const url = new URL(targetUrl);
			url.searchParams.delete("step");
			targetUrl = url.toString();
		}

		window.history.pushState({}, "", targetUrl);

		window.dispatchEvent(new Event("urlchange"));
	};

	const setStep = (step: number) => {
		if (!isMounted) return;
		const url = new URL(window.location.href);
		url.searchParams.set("step", String(step));
		history.replaceState(history.state, "", url.toString());
		window.dispatchEvent(new Event("urlchange"));
	};

	return { openBooking, closeBooking, setStep, isBookingOpen };
}
