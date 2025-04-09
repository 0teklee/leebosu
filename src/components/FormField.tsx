import { ReactNode } from "react";

interface FormFieldProps {
	label: string;
	htmlFor: string;
	error?: string;
	children: ReactNode;
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
	return (
		<div className="mb-4">
			<label htmlFor={htmlFor} className="block text-base font-medium mb-1">
				{label}
			</label>
			{children}
			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
}
