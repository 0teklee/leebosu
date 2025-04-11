import { StackIconPath, XIconPath } from "@/utils/icon-paths.ts";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../../booking/BookingContext";
import useAnimateDelay from "../../hooks/useAnimateDelay.ts";
import useOutsideClick from "../../hooks/useOutsideClick.ts";
import { Button } from "../atom/Button.tsx";
import MorphIcon from "../atom/MorphIcon.tsx";

const MobileNav: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isAnimating, setAnimate] = useAnimateDelay(100);
	const navRef = useRef<HTMLElement>(null);

	const handleClose = () => {
		setAnimate(() => {
			setIsOpen(false);
		});
	};

	const { openBooking } = useBooking();

	const toggleMenu = () => {
		setAnimate(() => {
			setIsOpen((prev) => !prev);
		});
	};

	const handleBookingClick = () => {
		openBooking();
	};

	// NOTE: 외부 클릭 이벤트 처리
	useOutsideClick(navRef, () => {
		handleClose();
	});

	return (
		<div className="md:hidden z-10">
			{/* Hide on medium screens and up */}
			<Button
				variant="ghost"
				onClick={toggleMenu}
				aria-label="Open main menu"
				aria-expanded={isOpen}
			>
				<MorphIcon
					from={StackIconPath}
					to={XIconPath}
					isOpen={isOpen}
					duration={400}
					className="stroke-2 w-6 h-6"
				/>
			</Button>
			{isOpen && (
				<nav
					ref={navRef}
					className={`
				absolute top-16 right-0 
				mt-2 w-48 
				bg-background 
				rounded-md shadow-lg 
				ring-1 ring-background-secondary
				anim-duration-300
				anim-fill-both
				${isAnimating ? "animate-slide-fade-out-up" : "animate-slide-fade-in-up"}
				 `}
				>
					<div className="py-1 *:block *:px-4 *:py-2 *:text-sm *:text-primary *:hover:bg-background-secondary">
						<Link to="/" onClick={() => setIsOpen(false)}>
							홈
						</Link>
						<Link to="/about" onClick={() => setIsOpen(false)}>
							소개
						</Link>
						<button
							onClick={handleBookingClick}
							className="block w-full text-left px-4 py-2 text-sm text-primary dark:text-secondary hover:bg-background-secondary dark:hover:bg-background"
						>
							예약
						</button>
					</div>
				</nav>
			)}
		</div>
	);
};

export default MobileNav;
