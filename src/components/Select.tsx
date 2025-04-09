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
					className={`w-full rounded border border-gray-300 px-3 py-2 text-lg bg-white
            focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600
            ${error ? "border-red-500" : ""}
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
				{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
			</div>
		);
	}
);
