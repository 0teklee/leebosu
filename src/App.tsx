import {createContext, ReactNode, useContext, useState} from "react";
import {BookingForm} from "./booking/BookingForm.tsx";
import {Dialog} from "./components/atom/Dialog.tsx";
import {ErrorBoundary} from "./components/ErrorBoundary";
import {Layout} from "./components/layout/Layout.tsx";
import "./global.css";
import {Router} from "./router";

interface BookingContextType {
	openBooking: () => void;
	closeBooking: () => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
	const context = useContext(BookingContext);
	if (!context) {
		throw new Error("useBooking must be used within a BookingProvider");
	}
	return context;
}

interface BookingProviderProps {
	children: ReactNode;
}

function BookingProvider({ children }: BookingProviderProps) {
	const [isBookingOpen, setIsBookingOpen] = useState(false);

	const openBooking = () => setIsBookingOpen(true);
	const closeBooking = () => setIsBookingOpen(false);

	return (
		<BookingContext.Provider value={{ openBooking, closeBooking }}>
			{children}
			<Dialog isOpen={isBookingOpen} onClose={closeBooking} title="예약하기">
				<BookingForm onClose={closeBooking} />
			</Dialog>
		</BookingContext.Provider>
	);
}

function App() {
	return (
		<ErrorBoundary>
			{/* <TransitionProvider> */}
				<BookingProvider>
					<Layout>
						<Router />
					</Layout>
				</BookingProvider>
			{/* </TransitionProvider> */}
		</ErrorBoundary>
	);
}

export default App;
