import { useReducer } from "react";
import { useLocalStorage } from "./useLocalStorage";

// Form state interface
export interface BookingForm {
	mainCategory: string;
	subCategory: string;
	date: string;
	location: string;
	contact: string;
	estimatedPrice: number;
}

// Initial form state
const initialState: BookingForm = {
	mainCategory: "",
	subCategory: "",
	date: "",
	location: "",
	contact: "",
	estimatedPrice: 0,
};

// Action types
type FormAction =
	| { type: "SET_MAIN_CATEGORY"; payload: string }
	| { type: "SET_SUB_CATEGORY"; payload: string; price: number }
	| { type: "SET_DATE"; payload: string }
	| { type: "SET_LOCATION"; payload: string }
	| { type: "SET_CONTACT"; payload: string }
	| { type: "RESET_FORM" };

// Reducer function
function formReducer(state: BookingForm, action: FormAction): BookingForm {
	switch (action.type) {
		case "SET_MAIN_CATEGORY":
			return {
				...state,
				mainCategory: action.payload,
				subCategory: "", // Reset related fields
				estimatedPrice: 0,
			};
		case "SET_SUB_CATEGORY":
			return {
				...state,
				subCategory: action.payload,
				estimatedPrice: action.price,
			};
		case "SET_DATE":
			return { ...state, date: action.payload };
		case "SET_LOCATION":
			return { ...state, location: action.payload };
		case "SET_CONTACT":
			return { ...state, contact: action.payload };
		case "RESET_FORM":
			return initialState;
		default:
			return state;
	}
}

// Refactor to use useActionState
// Read from form data tag
export function useFormState() {
	// Use localStorage to persist form state
	const [storedForm, setStoredForm] = useLocalStorage<BookingForm>(
		"booking-form",
		initialState
	);

	// Use reducer with localStorage-persisted initial state
	const [form, dispatch] = useReducer(formReducer, storedForm);

	// Sync reducer state back to localStorage on changes
	if (JSON.stringify(form) !== JSON.stringify(storedForm)) {
		setStoredForm(form);
	}

	return {
		form,
		setMainCategory: (category: string) =>
			dispatch({ type: "SET_MAIN_CATEGORY", payload: category }),
		setSubCategory: (category: string, price: number) =>
			dispatch({ type: "SET_SUB_CATEGORY", payload: category, price }),
		setDate: (date: string) => dispatch({ type: "SET_DATE", payload: date }),
		setLocation: (location: string) =>
			dispatch({ type: "SET_LOCATION", payload: location }),
		setContact: (contact: string) =>
			dispatch({ type: "SET_CONTACT", payload: contact }),
		resetForm: () => dispatch({ type: "RESET_FORM" }),
	};
}
