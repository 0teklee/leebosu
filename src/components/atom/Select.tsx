import { ChevronDownIconPath } from "@/utils/icon-paths";
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
			<div className="relative w-full">
				<select
					ref={ref}
					className={`
						w-full px-3 py-2 text-lg bg-background
						rounded ring ring-secondary focus:ring-theme 
						appearance-none
						hover:bg-theme/10
           				 ${error ? "ring-destructive" : ""}
           				 ${className }`}
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
				<svg
					className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
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
				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		);
	}
);
