import BookingButton from "../BookingButton";
import DarkModeToggle from "./DarkModeToggle";
import MobileNav from "./MobileNav";

export function Header() {
	return (
		<header className="px-4 py-2 sm:px-16 sm:py-4 bg-background border-b border-secondary z-10">
			<div className="flex items-center justify-between">
				<a href="/" className="text-theme heading-1">
					LEEBOSU
				</a>
				<div className="flex items-center gap-4 md:gap-6">
					<nav className="hidden md:block">
						<ul className="flex items-center gap-6">
							<li>
								<a href="/" className="link">
									홈
								</a>
							</li>
							<li>
								<a href="/about" className="link">
									소개
								</a>
							</li>
							<li>
								<BookingButton>예약</BookingButton>
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
