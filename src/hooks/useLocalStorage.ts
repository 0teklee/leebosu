import { useCallback, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error("Error reading from localStorage:", error);
			return initialValue;
		}
	});

	// Use a ref to track the current value without causing re-renders
	const valueRef = useRef(storedValue);
	valueRef.current = storedValue;

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				// Use the ref value for functional updates to avoid stale closures
				const valueToStore =
					value instanceof Function ? value(valueRef.current) : value;
				setStoredValue(valueToStore);

				if (typeof window !== "undefined") {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.error("Error saving to localStorage:", error);
			}
		},
		[key]
	); // Only depend on the storage key

	return [storedValue, setValue] as const;
}
