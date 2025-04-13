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

	console.log("daysArray", daysArray);

	return {
		today,
		year,
		month,
		daysArray,
	};
}
