import { useLocation, useNavigate } from "react-router-dom";

export function useBooking() {
	const navigate = useNavigate();
	const location = useLocation();

	const openBooking = (initialStep = 0) => {
		navigate(`/booking?step=${initialStep}`, {
			state: { backgroundLocation: location },
		});
	};

	const closeBooking = () => {
		const state = location.state as { backgroundLocation?: Location };
		const bg = state?.backgroundLocation;
		if (bg) navigate(bg);
		else if (window.history.length > 1) window.history.back();
		else navigate("/", { replace: true });
	};

	const setStep = (step: number) => {
		navigate(
			{
				pathname: location.pathname,
				search: `?step=${step}`,
			},
			{
				state: location.state,
			}
		);
	};

	return { openBooking, closeBooking, setStep };
}
