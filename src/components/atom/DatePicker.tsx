import useAnimateDelay, { DurationKeyType } from "@/hooks/useAnimateDelay";
import useOutsideClick from "@/hooks/useOutsideClick";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "../icons/ChevronIcon";
import { Button } from "./Button";
import { dayNames, monthNames } from "./constants";
import { Input } from "./Input";
import { generateCalendarData } from "./utils";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	defaultValue?: string;
	transitionDelay?: DurationKeyType;
}

export function DatePicker({
	className = "",
	error,
	label,
	transitionDelay = 250,
	...props
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		props.defaultValue ? new Date(props.defaultValue) : null
	);

	const formattedDate = formatDate(selectedDate);

	const inputRef = useRef<HTMLInputElement>(null);
	const displayRef = useRef<HTMLInputElement>(null);

	const [isExitAnimate, triggerAnimate, duration] =
		useAnimateDelay(transitionDelay);
	const animStyle = `${duration} anim-ease-in-out anim-fill-both`;

	const handleClick = () => {
		triggerAnimate(() => {
			setIsOpen(true);
		});
	};

	const changeMonth = (delta: number) => {
		setSelectedDate(
			selectedDate
				? new Date(
						selectedDate.getFullYear(),
						selectedDate.getMonth() + delta,
						1
				  )
				: null
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
		if (inputRef.current && formattedDate) {
			inputRef.current.value = formattedDate;
			const event = new Event("change", { bubbles: true, cancelable: true });
			inputRef.current.dispatchEvent(event);
		}
	}, [formattedDate, inputRef]);

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
			<div
				id="display-date"
				className={`
						relative
						${isOpen ? "*:opacity-0" : ""}
						${animStyle}
						${isExitAnimate ? "animate-slide-fade-out-down" : "animate-slide-fade-in-up"}
					`}
			>
				<Input
					ref={displayRef}
					type="text"
					name="display-date"
					value={formattedDate}
					readOnly
					className={`cursor-pointer bg-background caret-transparent ${className}`}
					placeholder="클릭하여 날짜를 선택해주세요"
					onClick={handleClick}
				/>
				<input
					type="date"
					ref={inputRef}
					name={props.name}
					id={props.id}
					className="sr-only -z-10 peer"
					required
					{...props}
				/>
				<ChevronIcon
					direction="down"
					className="absolute right-2 top-1/2 -translate-y-1/2"
				/>
				<label
					htmlFor={props.id || "date"}
					className="opacity-0 peer-invalid:opacity-100 text-sm text-destructive mt-1"
				>
					{error}
				</label>
			</div>
			{isOpen && (
				<DatePickerPopup
					selectedDate={selectedDate}
					animStyle={animStyle}
					isExitAnimate={isExitAnimate}
					changeMonth={changeMonth}
					handleOutSideClick={handleOutsideClick}
					handleDateSelect={handleDateSelect}
				/>
			)}
		</div>
	);
}

function DatePickerPopup({
	animStyle,
	isExitAnimate,
	changeMonth,
	selectedDate,
	handleDateSelect,
	handleOutSideClick,
}: {
	animStyle: string;
	isExitAnimate: boolean;
	changeMonth: (delta: number) => void;
	selectedDate: Date | null;
	handleDateSelect: (date: Date, today: Date) => void;
	handleOutSideClick: () => void;
}) {
	const calendarRef = useRef<HTMLDivElement>(null);

	const { today, year, month, daysArray } = generateCalendarData(selectedDate);
	useOutsideClick(calendarRef, () => {
		handleOutSideClick();
	});

	return (
		<div
			ref={calendarRef}
			className={`
					absolute top-0 left-0
					w-full pb-1 rounded
				  bg-background-secondary
					${animStyle}
				 	${isExitAnimate ? "animate-slide-fade-out-up" : "animate-slide-fade-in-up"}`}
		>
			<div className={`flex justify-between items-center mb-2`}>
				<Button
					variant="ghost"
					size="sm"
					type="button"
					onClick={() => changeMonth(-1)}
				>
					<ChevronIcon direction="left" />
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
					<ChevronIcon direction="right" />
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
												selectedDate &&
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
// 날짜가 없으면 "" 반환
function formatDate(date: Date | null): string | "" {
	if (!date) return "";
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		"0"
	)}-${String(date.getDate()).padStart(2, "0")}`;
}
