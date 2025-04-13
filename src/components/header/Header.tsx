import { useBooking } from "@hooks/useBooking";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle.tsx";
import MobileNav from "./MobileNav.tsx";

export function Header() {
	const { openBooking } = useBooking();

	return (
		<header className="px-4 py-2 sm:px-16 sm:py-4 bg-background border-b border-secondary z-10">
			<div className="flex items-center justify-between">
				<Link to="/" className="text-theme heading-1">
					LEEBOSU
				</Link>
				<div className="flex items-center gap-4 md:gap-6">
					<nav className="hidden md:block">
						<ul className="flex gap-6">
							<li>
								<Link to="/" className="link">
									홈
								</Link>
							</li>
							<li>
								<Link to="/about" className="link">
									소개
								</Link>
							</li>
							<li>
								<button onClick={() => openBooking()} className="link">
									예약
								</button>
							</li>
						</ul>
					</nav>
					<DarkModeToggle />
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
