import useAnimateDelay from "@/hooks/useAnimateDelay";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ChevronDownIconPath, ChevronUpIconPath } from "@/utils/icon-paths";
import { forwardRef, InputHTMLAttributes, useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import MorphIcon from "./MorphIcon";
import { dayNames, monthNames } from "./constants";
import { generateCalendarData } from "./utils";

interface DatePickerProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
	error?: string;
	onChange?: (date: string) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
	({ className = "", error, onChange, value, ...props }) => {
		const [isAnimate, triggerAnimate] = useAnimateDelay(200);

		const [isOpen, setIsOpen] = useState(false);
		const [selectedDate, setSelectedDate] = useState<Date | null>(
			value ? new Date(value as string) : null
		);
		const [displayValue, setDisplayValue] = useState((value as string) || "");
		const calendarRef = useRef<HTMLDivElement>(null);

		const { today, todayStart, year, month, daysArray } =
			generateCalendarData(selectedDate);

		// Handle outside click to close the calendar
		useOutsideClick(calendarRef, () => {
			triggerAnimate(() => {
				setIsOpen(false);
			});
		});

		// Handlers
		const handleDateSelect = (date: Date) => {
			if (date < todayStart) return;

			setSelectedDate(date);
			setDisplayValue(date.toLocaleDateString());

			onChange?.(date.toLocaleDateString());

			triggerAnimate(() => {
				setIsOpen(false);
			});
		};

		const changeMonth = (delta: number) => {
			const date = selectedDate || today;
			setSelectedDate(new Date(date.getFullYear(), date.getMonth() + delta, 1));
		};

		return (
			<div className={`w-full relative`} ref={calendarRef}>
				<Input
					onClick={() => {
						triggerAnimate(() => {
							setIsOpen(true);
						});
					}}
					type="text"
					readOnly
					value={displayValue}
					placeholder="년. 월 .일"
					className={`
						cursor-pointer
						z-10
						${error ? "ring-destructive" : ""}  
						${className}`}
					{...props}
				/>
				<MorphIcon
					className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
					to={ChevronUpIconPath}
					from={ChevronDownIconPath}
					isOpen={isOpen}
					duration={150}
				/>
				{isOpen && (
					<div
						className={`
						fixed inset-0
						w-full mt-4 p-2
					  bg-background-secondary 
					 	
						anim-duration-200 anim-ease-in-out anim-fill-both
						origin-top will-change-auto
					 	${isAnimate ? "animate-slide-fade-out-up" : "animate-slide-fade-in-up"}`}
					>
						<div className="flex justify-between items-center mb-2">
							<Button
								variant="ghost"
								size="sm"
								type="button"
								onClick={() => changeMonth(-1)}
							>
								&lt;
							</Button>
							<div className="font-medium">
								{year}년 {monthNames[month]}
							</div>
							<Button
								variant="ghost"
								size="sm"
								type="button"
								onClick={() => changeMonth(1)}
							>
								&gt;
							</Button>
						</div>

						<div className="grid grid-cols-7 gap-1 mb-1">
							{dayNames.map((day, index) => (
								<div key={index} className="text-center text-sm font-medium">
									{day}
								</div>
							))}
						</div>

						<div className="grid grid-cols-7 gap-1">
							{daysArray.map((date, index) => (
								<div key={index} className="text-center p-1">
									{date ? (
										<button
											type="button"
											onClick={() => handleDateSelect(date)}
											disabled={date < todayStart}
											className={`w-8 h-8 rounded-full flex items-center justify-center
												${
													selectedDate &&
													date.getDate() === selectedDate.getDate() &&
													date.getMonth() === selectedDate.getMonth() &&
													date.getFullYear() === selectedDate.getFullYear()
														? "bg-theme text-primary"
														: date < todayStart
														? "text-secondary/50 cursor-not-allowed"
														: "hover:bg-theme/50 cursor-pointer"
												}`}
										>
											{date.getDate()}
										</button>
									) : (
										<span className="w-8 h-8"></span>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		);
	}
);

DatePicker.displayName = "DatePicker";
