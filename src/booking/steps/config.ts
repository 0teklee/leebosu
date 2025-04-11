import { SERVICES } from "../text";
import { StepConfig } from "../types";
import { ContactStep } from "./ContactStep";
import { DateStep } from "./DateStep";
import { LocationStep } from "./LocationStep";
import { MainCategoryStep } from "./MainCategoryStep";
import { SubCategoryStep } from "./SubCategoryStep";

// Helper functions for validation
const validateMainCategory = (formData: FormData) => {
	const mainCategory = formData.get("mainCategory") as string;
	return Boolean(
		mainCategory && SERVICES[mainCategory as keyof typeof SERVICES]
	);
};

const validateSubCategory = (formData: FormData) => {
	const subCategory = formData.get("subCategory") as string;
	const mainCategory = formData.get("mainCategory") as string;

	if (!mainCategory || !validateMainCategory(formData)) {
		return false;
	}

	const category = SERVICES[mainCategory as keyof typeof SERVICES];
	return Boolean(
		subCategory && category?.subCategories.find((sub) => sub.id === subCategory)
	);
};

const validateDate = (formData: FormData) => {
	const date = formData.get("date") as string;
	return Boolean(date && new Date(date) > new Date());
};

const validateLocation = (formData: FormData) => {
	const location = formData.get("location") as string;
	return Boolean(location && location.trim().length >= 3);
};

const validateContact = (formData: FormData) => {
	const contact = formData.get("contact") as string;
	return Boolean(contact && /^\d{3}-\d{3,4}-\d{4}$/.test(contact));
};

export const stepConfig: StepConfig[] = [
	{
		id: "mainCategory",
		label: "대분류 선택",
		component: MainCategoryStep,
		validate: async (formData: FormData) => validateMainCategory(formData),
	},
	{
		id: "subCategory",
		label: "소분류 선택",
		component: SubCategoryStep,
		validate: async (formData: FormData) => validateSubCategory(formData),
	},
	{
		id: "date",
		label: "날짜 선택",
		component: DateStep,
		validate: async (formData: FormData) => validateDate(formData),
	},
	{
		id: "location",
		label: "지역 입력",
		component: LocationStep,
		validate: async (formData: FormData) => validateLocation(formData),
	},
	{
		id: "contact",
		label: "연락처 입력",
		component: ContactStep,
		validate: async (formData: FormData) => validateContact(formData),
	},
];
