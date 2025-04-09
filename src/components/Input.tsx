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
					className={`w-full rounded border border-gray-300 px-3 py-2 text-lg placeholder-gray-400 
            focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600
            ${error ? "border-red-500" : ""}
            ${className}`}
					{...props}
				/>
				{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
			</div>
		);
	}
);
