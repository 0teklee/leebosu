import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

// Define own props separately and make it generic
type ButtonOwnProps<T extends ElementType = ElementType> = {
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
	as?: T;
	children: ReactNode;
	className?: string;
	href?: string;
};

// Combine own props with props from the actual element type T, omitting overlaps
type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

// Make the component generic, defaulting T to 'button'
export function Button<T extends ElementType = "button">({
	variant = "primary",
	size = "md",
	fullWidth = false,
	children,
	className = "",
	as,
	...props
}: ButtonProps<T>) {
	const Tag = as || "button";

	const baseStyles =
		"rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variantStyles = {
		primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/50",
		secondary:
			"bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500/50",
		outline:
			"border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-500/50",
	};

	const sizeStyles = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	return (
		<Tag
			className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
				fullWidth ? "w-full" : ""
			} ${className}`}
			{...props}
		>
			{children}
		</Tag>
	);
}
