import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className = "", error, defaultValue, ...props }, ref) => {
		return (
			<div className="w-full">
				<input
					ref={ref}
					className={`
						w-full px-3 py-2
						text-lg placeholder-text-secondary
           				rounded ring-1 ring-secondary focus:ring-theme 
						hover:bg-theme/10 focus:bg-theme/10
            ${error ? "border-destructive" : ""}
            ${className}`}
					{...props}
					defaultValue={defaultValue}
				/>
			</div>
		);
	}
);
