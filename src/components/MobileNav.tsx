import React, { useState } from "react";

const MobileNav: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="md:hidden">
			{" "}
			{/* Hide on medium screens and up */}
			<button
				onClick={toggleMenu}
				className="p-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
				<nav className="absolute top-16 right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
					<div className="py-1">
						<a
							href="/"
							className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							Home
						</a>
						<a
							href="/about"
							className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							About
						</a>
						{/* Add other nav links here */}
					</div>
				</nav>
			)}
		</div>
	);
};

export default MobileNav;
