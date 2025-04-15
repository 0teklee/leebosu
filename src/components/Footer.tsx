const Footer = () => {
	return (
		<footer className="bg-background-secondary self-end py-4 sm:py-2 border-t border-text-secondary">
			<div className="space-y-1 text-center text-secondary">
				<p className="text-sm upper">Leebosu.com</p>
				<p className="text-xs">
					© {new Date().getFullYear()} All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
