import { createContext, ReactNode, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BookingProviderProps {
	children: ReactNode;
}

interface BookingContextType {
	isOpen: boolean;
	currentStep: number;
	openBooking: (initialStep?: number) => void;
	closeBooking: () => void;
	setStep: (step: number) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
	const context = useContext(BookingContext);
	if (!context) {
		throw new Error("useBooking must be used within a BookingProvider");
	}
	return context;
}

export function BookingProvider({ children }: BookingProviderProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const isOpen = location.pathname === "/booking";
	const currentStep = parseInt(
		new URLSearchParams(location.search).get("step") || "0",
		10
	);

	const openBooking = useCallback(
		(initialStep = 0) => {
			navigate(
				{
					pathname: "booking",
					search: `?step=${initialStep}`,
				},

				{ replace: true }
			);
		},
		[navigate]
	);

	function closeBooking() {
		navigate({ ...location }, { replace: true });
		window.history.back();
	}

	function setStep(step: number) {
		navigate(
			{
				pathname: "booking",
				search: `?step=${step}`,
			},
			{ replace: true }
		);
	}

	return (
		<BookingContext.Provider
			value={{
				isOpen,
				currentStep,
				openBooking,
				closeBooking,
				setStep,
			}}
		>
			{children}
		</BookingContext.Provider>
	);
}
