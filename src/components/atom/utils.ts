export function generateCalendarData(selectedDate: Date | null) {
	const today = new Date();

	const currentDate = selectedDate ? selectedDate : today;
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const firstDay = new Date(year, month, 1);
	const startingDay = firstDay.getDay();
	const totalDays = new Date(year, month + 1, 0).getDate();

	const validStartingDay = Math.max(0, Math.min(6, startingDay));

	const daysArray = [
		...Array(validStartingDay).fill(null),
		...Array.from(
			{ length: totalDays },
			(_, i) => new Date(year, month, i + 1)
		),
	];

	return {
		today,
		year,
		month,
		daysArray,
	};
}

export function getInitialSelectedDate(): Date {
	const today = new Date();
	const lastDayOfMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		0
	).getDate();

	// 오늘이 월말인 경우
	if (today.getDate() === lastDayOfMonth) {
		// 다음달 1일로 설정
		return new Date(today.getFullYear(), today.getMonth() + 1, 1);
	}

	// 월말이 아닌 경우 오늘 날짜 반환
	return today;
}

/**
 * 날짜가 없으면 "" 반환
 * @param date
 * @returns
 */
export function formatDate(date: Date | null): string | "" {
	if (!date) return "";
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(date.getDate()).padStart(2, "0")}`;
}
