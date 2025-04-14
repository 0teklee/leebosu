import { ChevronDownIconPath } from "./icon-paths";

interface ChevronIconProps {
	className?: string;
	size?: number;
	direction?: "up" | "down" | "left" | "right";
	strokeColor?: string;
	strokeWidth?: number;
}

export function ChevronIcon({
	className,
	size = 24,
	direction = "down",
	strokeColor = "currentColor",
	strokeWidth = 2,
}: ChevronIconProps) {
	const dirClass = (() => {
		switch (direction) {
			case "up":
				return "rotate-180";
			case "left":
				return "rotate-90";
			case "right":
				return "-rotate-90";
			case "down":
				return "";
			default:
				return "";
		}
	})();
	return (
		<svg
			className={`${dirClass} ${className}`}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={strokeColor}
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d={ChevronDownIconPath} />
		</svg>
	);
}
