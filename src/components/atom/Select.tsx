import { forwardRef, SelectHTMLAttributes } from "react";

interface Option {
	value: string;
	label: string;
}

interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
	options: Option[];
	error?: string;
	onChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className = "", options, error, onChange, ...props }, ref) => {
		return (
			<div className="w-full">
				<select
					ref={ref}
					className={`w-full rounded border border-secondary px-3 py-2 text-lg bg-background
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
            ${error ? "border-destructive" : ""}
            ${className}`}
					onChange={(e) => onChange?.(e.target.value)}
					{...props}
				>
					<option value="" disabled>
						선택해주세요
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		);
	}
);
