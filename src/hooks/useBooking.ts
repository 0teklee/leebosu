import { useEffect, useState } from "react";

import { useMounted } from "./useMounted";

type HistoryState = {
	previousStep?: number;
	backgroundLocation?: string;
};

export function useBooking() {
	const isMounted = useMounted();
	const [isBookingOpen, setIsBookingOpen] = useState(false);
	const [previousStep, setPreviousStep] = useState<number>(
		getHistoryState()?.previousStep || -1
	);

	function getHistoryState(): HistoryState {
		if (!isMounted || typeof window === "undefined") return {};
		const state = window.history.state as HistoryState;
		return state;
	}

	// 예약 모달 열림, 닫힘 이벤트 핸들러 등록 및 제거
	useEffect(() => {
		if (!isMounted || typeof window === "undefined") return;

		const syncFromUrl = () => {
			const isBookingPath = window.location.pathname.startsWith("/booking");
			setIsBookingOpen(isBookingPath);
			setPreviousStep(getHistoryState()?.previousStep || -1);
		};

		syncFromUrl();

		window.addEventListener("urlchange", syncFromUrl);
		window.addEventListener("popstate", syncFromUrl);

		return () => {
			window.removeEventListener("urlchange", syncFromUrl);
			window.removeEventListener("popstate", syncFromUrl);
		};
	}, [isMounted, getHistoryState]);

	const openBooking = (initialStep = 0) => {
		if (!isMounted) return;

		const url = new URL(window.location.href);
		url.pathname = "/booking";
		url.searchParams.set("step", String(initialStep));

		// 다이얼로그 열리기 전 히스토리 상태 설정
		window.history.pushState(
			{ backgroundLocation: window.location.href },
			"",
			url.toString()
		);

		window.dispatchEvent(new Event("urlchange"));
	};

	const closeBooking = () => {
		if (!isMounted) return;

		let targetUrl = getHistoryState()?.backgroundLocation || "/";
		const url = new URL(targetUrl);
		url.searchParams.delete("step");
		targetUrl = url.toString();

		window.history.pushState({}, "", targetUrl);
		window.dispatchEvent(new Event("urlchange"));
	};

	const setStep = (step: number) => {
		if (!isMounted || typeof window === "undefined") return;

		const url = new URL(window.location.href);
		url.searchParams.set("step", String(step));

		const currentState = getHistoryState();
		const previousStep = currentState?.previousStep;
		// navigation 이동 전, search param에서 현재 스텝을 previousStep으로 저장
		const newState = { ...currentState, previousStep };

		history.pushState(newState, "", url.toString());
		window.dispatchEvent(new Event("urlchange"));
	};

	return {
		openBooking,
		closeBooking,
		setStep,
		isBookingOpen,
		previousStep,
	};
}
