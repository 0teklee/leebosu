import clsx from "clsx";
import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useEffect,
} from "react";
import { createPortal } from "react-dom";
import useAnimateDelay from "../../hooks/useAnimateDelay.ts";
import { XIconPath } from "../icons/icon-paths.ts";
import { Button } from "./Button.tsx";

interface DialogContextType {
	isOpen: boolean;
	onClose: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

const useDialogContext = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("Dialog components must be used within a Dialog");
	}
	return context;
};

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
}

function Dialog({ isOpen, onClose, children }: DialogProps) {
	const [isExitAnimate, setAnimate] = useAnimateDelay(300);

	const handleClose = () => {
		setAnimate(() => {
			onClose();
		});
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.setProperty("overflow", "hidden");
		}
		return () => {
			document.body.style.setProperty("overflow", "");
		};
	}, [isOpen]);

	return createPortal(
		<DialogContext.Provider value={{ isOpen, onClose: handleClose }}>
			<dialog open={isOpen} className={`${isOpen ? "fixed" : "hidden"}`}>
				<div
					className={`
						fixed inset-0
						 bg-black/50
						 anim-duration-300
						 anim-fill-both
						 anim-timing-ease-in-out
						 ${isExitAnimate ? "animate-fade-out" : "animate-fade-in"}`}
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
						overflow-x-hidden
						sm:overflow-y-hidden
						bg-background shadow-xl
						rounded-t-lg sm:rounded-lg
						anim-duration-300
						anim-fill-both
						anim-timing-ease-in-out
						${isExitAnimate ? "animate-slide-fade-out-down" : "animate-slide-fade-in-down"}
					`}
				>
					{children}
				</div>
			</dialog>
		</DialogContext.Provider>,
		document.body
	);
}

interface DialogContentProps extends PropsWithChildren {
	className?: string;
	height?: string;
}

function DialogHeader({ children, className }: DialogContentProps) {
	const { onClose } = useDialogContext();

	return (
		<header className={`relative space-y-4 px-4 pt-6 ${className || ""}`}>
			{children}
			<Button
				variant="ghost"
				size="sm"
				onClick={onClose}
				aria-label="Close dialog"
				className={`absolute top-2 right-2 p-0 hover:text-destructive`}
			>
				<svg
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d={XIconPath}
					/>
				</svg>
			</Button>
		</header>
	);
}

function DialogContent({
	children,
	className,
	height = "h-[40dvh]",
}: DialogContentProps) {
	return (
		<div
			className={clsx(
				"px-4 pb-8",
				"bg-background overflow-y-auto",
				className,
				height
			)}
		>
			{children}
		</div>
	);
}

function DialogFooter({ children, className }: DialogContentProps) {
	return (
		<footer className={`border-primary px-4 pt-6 pb-8 ${className || ""}`}>
			{children}
		</footer>
	);
}

// Attach subcomponents to Dialog
Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export { Dialog };
