import { useBooking } from "@hooks/useBooking";
import { ComponentPropsWithoutRef } from "react";
import { Button, ButtonOwnProps } from "./atom/Button";

type BookingButtonProps = ButtonOwnProps<"button"> &
	Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps<"button">>;

function BookingButton({ children, ...props }: BookingButtonProps) {
	const { openBooking } = useBooking();

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault(); // Prevent any default navigation
		openBooking();
	}

	return (
		<Button onClick={handleClick} {...props}>
			{children}
		</Button>
	);
}

export default BookingButton;
