import useAnimateDelay from "@/hooks/useAnimateDelay";
import useOutsideClick from "@/hooks/useOutsideClick";
import { ChevronDownIconPath } from "@/utils/icon-paths";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { dayNames, monthNames } from "./constants";
import { Input } from "./Input";
import { generateCalendarData } from "./utils";

interface DatePickerProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"type" | "onChange" | "value"
	> {
	label?: string;
	error?: string;
	value: string | null;
	onChange: (date: string) => void;
}

export function DatePicker({
	className = "",
	error,
	value,
	label,
	onChange,
	...props
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(
		value ? new Date(value) : new Date()
	);
	const inputRef = useRef<HTMLInputElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);

	const [isAnimate, triggerAnimate, animDuration] = useAnimateDelay(300);

	const animStyle = `anim-duration-${animDuration} anim-ease-in-out anim-fill-both`;

	const changeMonth = (delta: number) => {
		setSelectedDate(
			new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1)
		);
	};

	const handleOutsideClick = () => {
		if (isOpen) {
			triggerAnimate(() => {
				setIsOpen(false);
			});
		}
	};

	const handleDateSelect = (date: Date, today: Date) => {
		if (date < today) return;
		setSelectedDate(date);

		triggerAnimate(() => {
			setIsOpen(false);
		});
	};

	useEffect(() => {
		onChange?.(selectedDate.toLocaleDateString("ko-KR") || "");
	}, [selectedDate, onChange]);

	return (
		<div className={`w-full relative`}>
			{label && (
				<label
					htmlFor={props.id || "date-picker-display"}
					className="block text-sm font-medium mb-1"
				>
					{label}
				</label>
			)}
			<input
				ref={inputRef}
				value={selectedDate.toLocaleDateString("ko-KR")}
				type="date"
				className="hidden"
				{...props}
			/>
			<div
				id="display-date"
				className={`
						relative
						${isOpen ? "*:opacity-0" : ""}
						${animStyle}
						${isAnimate ? "animate-slide-fade-out-down" : "animate-slide-fade-in-up"}
					`}
			>
				<Input
					id={"date-picker-display"}
					readOnly
					value={selectedDate.toLocaleDateString("ko-KR")}
					className={`
							cursor-pointer  
							bg-background
							invalid:ring-destructive
							${className}
							`}
					placeholder="날짜 선택"
					onClick={() => {
						triggerAnimate(() => {
							setIsOpen(true);
						});
					}}
					aria-expanded={isOpen}
					disabled={props.disabled}
				/>
				<svg
					className="absolute w-6 h-6 right-2 top-1/2 -translate-y-1/2 text-primary"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
				>
					<path d={ChevronDownIconPath} />
				</svg>
			</div>
			{isOpen && (
				<DatePickerPopup
					calendarRef={calendarRef}
					animStyle={animStyle}
					isAnimate={isAnimate}
					changeMonth={changeMonth}
					handleOutSideClick={handleOutsideClick}
					selectedDate={selectedDate}
					handleDateSelect={handleDateSelect}
				/>
			)}
			{error && <p className="text-sm text-destructive mt-1">{error}</p>}
		</div>
	);
}

function DatePickerPopup({
	calendarRef,
	animStyle,
	isAnimate,
	changeMonth,
	selectedDate,
	handleDateSelect,
	handleOutSideClick,
}: {
	calendarRef: React.RefObject<HTMLDivElement | null>;
	animStyle: string;
	isAnimate: boolean;
	changeMonth: (delta: number) => void;
	selectedDate: Date;
	handleDateSelect: (date: Date, today: Date) => void;
	handleOutSideClick: () => void;
}) {
	useOutsideClick(calendarRef, () => {
		handleOutSideClick();
	});
	const { today, year, month, daysArray } = generateCalendarData(selectedDate);

	return (
		<div
			ref={calendarRef}
			className={`
					absolute top-0 left-0
					w-full pb-1 rounded
				  bg-background-secondary
					${animStyle}
				 	${isAnimate ? "animate-slide-fade-out-up" : "animate-slide-fade-in-up"}`}
		>
			<div className={`flex justify-between items-center mb-2`}>
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

			<div className="grid grid-cols-7 gap-1 place-items-center">
				{daysArray.map((date, index) => (
					<div key={index} className="w-8 p-0.5">
						{date ? (
							<button
								type="button"
								onClick={() => handleDateSelect(date, today)}
								disabled={date < today}
								className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
											${
												date.toISOString() === selectedDate.toISOString()
													? "bg-theme text-white font-bold"
													: date < today
													? "text-secondary/50 cursor-not-allowed"
													: "hover:bg-theme/50 hover:text-primary cursor-pointer"
											}`}
							>
								{date.getDate()}
							</button>
						) : (
							<span className="w-8 h-8" aria-hidden="true"></span>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
