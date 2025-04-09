import React from "react";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { useAppTransition } from "../hooks/useAppTransition";

export function TransitionLink({ to, children, ...props }: LinkProps) {
	const { startTransition } = useAppTransition();
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		startTransition(() => {
			navigate(to as string); // Ensure 'to' is treated as a string path
		});
	};

	return (
		<Link to={to} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
