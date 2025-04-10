function StackIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={`w-6 h-6 ${className}`}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 12l-8-8m8 8l8-8m-8 8v12"
			/>
		</svg>
	);
}

export default StackIcon;
