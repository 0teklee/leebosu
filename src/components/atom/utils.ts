export function generateCalendarData(selectedDate: Date | null) {
	const today = new Date();
	const todayStart = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);

	const currentDate = selectedDate || today;
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const firstDay = new Date(year, month, 1);
	const startingDay = firstDay.getDay();
	const totalDays = new Date(year, month + 1, 0).getDate();

	const daysArray = [
		...Array(startingDay).fill(null),
		...Array.from(
			{ length: totalDays },
			(_, i) => new Date(year, month, i + 1)
		),
	];

	return {
		today,
		todayStart,
		year,
		month,
		daysArray,
	};
}
