import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className = "", error, ...props }, ref) => {
		return (
			<div className="w-full">
				<input
					ref={ref}
					className={`w-full rounded border border-secondary px-3 py-2 text-lg placeholder-text-secondary
            focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
            ${error ? "border-destructive" : ""}
            ${className}`}
					{...props}
				/>
				{error && <p className="mt-1 text-sm text-destructive">{error}</p>}
			</div>
		);
	}
);
