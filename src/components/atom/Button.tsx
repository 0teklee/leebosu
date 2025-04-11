import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

// Define own props separately and make it generic
type ButtonOwnProps<T extends ElementType = ElementType> = {
	variant?: "primary" | "secondary" | "outline" | "ghost";
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

	const baseStyles = `
		rounded font-medium transition-colors cursor-pointer`;

	const variants = {
		primary: "bg-theme text-white hover:bg-theme/90 focus:ring-theme/50",
		secondary:
			"bg-theme/50 text-background hover:bg-theme/90 focus:ring-theme/50",
		outline:
			"ring-1 ring-secondary bg-transparent hover:bg-background-secondary focus:ring-secondary/50",
		ghost:
			"bg-transparent hover:bg-background-secondary focus:ring-secondary/50",
	};

	const sizeStyles = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const focusStyles = {
		primary: "focus:ring-theme/50",
		secondary: "focus:ring-theme/50",
		outline: "focus:ring-secondary/50",
		ghost: "focus:ring-secondary/50",
	};
	return (
		<Tag
			className={`${baseStyles} ${variants[variant]} ${sizeStyles[size]} ${
				fullWidth ? "w-full" : ""
			} ${className}`}
			{...props}
		>
			{children}
		</Tag>
	);
}
