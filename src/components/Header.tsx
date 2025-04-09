import DarkModeToggle from "./DarkModeToggle";
import MobileNav from "./MobileNav";
import { TransitionLink } from "./TransitionLink";

export function Header() {
	return (
		<header className="px-4 py-2 sm:px-6 sm:py-4 bg-background border-b border-secondary z-10">
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<TransitionLink to="/" className="link heading-1">
						LEEBOSU
					</TransitionLink>
					<div className="flex items-center gap-4 md:gap-6">
						<nav className="hidden md:block">
							<ul className="flex gap-6">
								<li>
									<TransitionLink to="/" className="link">
										홈
									</TransitionLink>
								</li>
								<li>
									<TransitionLink to="/about" className="link">
										소개
									</TransitionLink>
								</li>
								<li>
									<TransitionLink to="/book" className="link">
										예약
									</TransitionLink>
								</li>
							</ul>
						</nav>
						<DarkModeToggle />
						<MobileNav />
					</div>
				</div>
			</div>
		</header>
	);
}
