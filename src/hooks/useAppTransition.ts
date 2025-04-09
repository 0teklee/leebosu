import { createContext, useContext, TransitionStartFunction } from "react";

interface TransitionContextType {
	isPending: boolean;
	startTransition: TransitionStartFunction;
}

export const TransitionContext = createContext<
	TransitionContextType | undefined
>(undefined);

export function useAppTransition() {
	const context = useContext(TransitionContext);
	if (context === undefined) {
		throw new Error(
			"useAppTransition must be used within a TransitionProvider"
		);
	}
	return context;
}
