import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useBooking} from "../../App.tsx";
import useAnimateDelay from "../../hooks/useAnimateDelay.ts";
import useOutsideClick from "../../hooks/useOutsideClick.ts";

const MobileNav: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isAnimating, setAnimate] = useAnimateDelay(200);
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
			<button
				onClick={toggleMenu}
				className="p-2 text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary cursor-pointer"
				aria-label="Open main menu"
				aria-expanded={isOpen}
			>
				{/* Basic Hamburger Icon */}
				<svg
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{isOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					)}
				</svg>
			</button>
			{/* Flyout Menu (basic example) */}
			{isOpen && (
				<nav
					ref={navRef}
					className={`
				absolute top-16 right-0 
				mt-2 w-48 
				bg-background 
				rounded-md shadow-lg 
				ring-1 ring-background-secondary
				anim-duration-200
				anim-fill-both
				${isAnimating ? "animate-slide-fade-out-up" : "animate-slide-fade-in-up"}
				 `}
				>
					<div className="py-1 *:block *:px-4 *:py-2 *:text-sm *:text-primary *:hover:bg-background-secondary">
						<Link
							to="/"
							onClick={() => setIsOpen(false)}
						>
							홈
						</Link>
						<Link
							to="/about"
							onClick={() => setIsOpen(false)}
						>
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
