import { forwardRef, InputHTMLAttributes } from "react";

interface DatePickerProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
	error?: string;
	onChange?: (date: string) => void;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
	({ className = "", error, onChange, ...props }, ref) => {
		// Calculate min date (today)
		const today = new Date();
		const formattedToday = today.toISOString().split("T")[0];

		return (
			<div className="w-full">
				<input
					ref={ref}
					type="date"
					min={formattedToday}
					className={`w-full rounded border border-secondary px-3 py-2 text-lg
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
            ${error ? "border-destructive" : ""}
            ${className}`}
					onChange={(e) => onChange?.(e.target.value)}
					{...props}
				/>
				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		);
	}
);
