import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

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
	// Prevent body scroll when dialog is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="fixed inset-0 bg-black/10 animate-dialog-overlay"
				onClick={onClose}
				data-testid="dialog-backdrop"
			/>
			<div 
				className="relative bg-background w-full max-w-md overflow-auto shadow-xl animate-dialog-content"
				
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
		</div>,
		document.body
	);
}
