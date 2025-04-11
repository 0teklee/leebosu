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

	const variantStyles = {
		primary: "bg-theme text-white",
		secondary: "bg-theme/50 text-background",
		outline: "ring-1 ring-secondary bg-transparent",
		ghost: "bg-transparent",
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

	const hoverStyles = {
		primary: "hover:bg-theme/90",
		secondary: "hover:bg-theme/90",
		outline: "hover:bg-background-secondary",
		ghost: "hover:bg-background-secondary",
	};

	return (
		<Tag
			className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} 
			${focusStyles[variant]}
			${hoverStyles[variant]}
			disabled:opacity-50 disabled:cursor-not-allowed
			${fullWidth ? "w-full" : ""} ${className || ""}`}
			{...props}
		>
			{children}
		</Tag>
	);
}
