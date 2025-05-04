import { ReactNode } from "react";

interface FormFieldProps {
	label: string;
	htmlFor: string;
	children: ReactNode;
	className?: string;
}

export function FormField({
	label,
	htmlFor,
	children,
	className,
}: FormFieldProps) {
	return (
		<div className={`${className || ""}`}>
			<label htmlFor={htmlFor} className="block text-base font-medium mb-1">
				{label}
			</label>
			{children}
		</div>
	);
}
