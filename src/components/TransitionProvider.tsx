import { PropsWithChildren, useTransition } from "react";
import { TransitionContext } from "../hooks/useAppTransition";

export const TransitionProvider = ({ children }: PropsWithChildren) => {
	const [isPending, startTransition] = useTransition();

	return (
		<TransitionContext.Provider value={{ isPending, startTransition }}>
			{children}
		</TransitionContext.Provider>
	);
};
