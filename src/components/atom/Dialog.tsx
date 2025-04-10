import {ReactNode, useEffect} from "react";
import {createPortal} from "react-dom";
import useAnimateDelay from "../../hooks/useAnimateDelay.ts";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	footer?: ReactNode;
}
// Refactor to use react create portal
export function Dialog({
	isOpen,
	onClose,
	title,
	children,
	footer,
}: DialogProps) {
	const [isAnimating, setAnimate] = useAnimateDelay(200);

	const handleClose = () => {
		setAnimate(() => {
			onClose();
		});
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.setProperty("overflow", "hidden");
		} else {
			document.body.style.setProperty("overflow", "");
		}
	}, [isOpen]);

	return createPortal(
		<dialog
			open={isOpen}
			className={`${isOpen ? "fixed" : "hidden"} 
			`}
		>
			<div
				className={`
					fixed inset-0
					 bg-black/50
					 anim-duration-200
					 anim-fill-both
					 anim-timing-ease-in-out
					 ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}
				onClick={handleClose}
				data-testid="dialog-backdrop"
				aria-hidden={!isOpen}
				aria-label="Dialog backdrop"
			/>
			<div
				aria-label="Dialog content"
				className={`
					relative 
					self-end sm:self-center
					w-full max-w-md
					min-h-[70vh] sm:min-h-none 
					bg-background shadow-xl
					rounded-t-lg sm:rounded-lg
					anim-duration-200
					anim-fill-backwards
					anim-timing-ease-in-out
					${isAnimating ? "animate-slide-fade-out-down" : "animate-slide-fade-in-down"} 
				`}
			>
				{title && (
					<header className="border-b border-text-secondary px-6 py-4">
						<h2 className="text-xl font-semibold">{title}</h2>
					</header>
				)}
				<div className="bg-background px-6 py-4">{children}</div>
				{footer && (
					<footer className="border-t border-primary px-6 py-4">
						{footer}
					</footer>
				)}
			</div>
		</dialog>,
		document.body
	);
}
