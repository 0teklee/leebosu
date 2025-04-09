import { useState } from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { Select } from "./Select";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { StepIndicator } from "./StepIndicator";
import { PriceDisplay } from "./PriceDisplay";
import { useFormState } from "../hooks/useFormState";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { SERVICES } from "../constants/services";
import { TEXT } from "../constants/text";

interface BookingFormProps {
	onClose: () => void;
}

export function BookingForm({ onClose }: BookingFormProps) {
	const {
		form,
		setMainCategory,
		setSubCategory,
		setDate,
		setLocation,
		setContact,
		resetForm,
	} = useFormState();
	const { currentStep, canGoNext, goToNextStep, goToPrevStep } =
		useStepNavigation();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			// In a real app, this would be an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setIsSubmitted(true);
			resetForm();
		} catch (error) {
			console.error("Failed to submit booking:", error);
			alert("예약 제출에 실패했습니다. 다시 시도해주세요.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleNextStep = () => {
		if (currentStep === TEXT.booking.steps.length - 1) {
			handleSubmit();
		} else {
			goToNextStep();
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return (
					<FormField label="대분류 선택" htmlFor="mainCategory">
						<Select
							id="mainCategory"
							value={form.mainCategory}
							onChange={setMainCategory}
							options={Object.entries(SERVICES).map(([value, { name }]) => ({
								value,
								label: name,
							}))}
						/>
					</FormField>
				);
			case 1:
				return (
					<FormField label="소분류 선택" htmlFor="subCategory">
						<Select
							id="subCategory"
							value={form.subCategory}
							onChange={(value) => {
								const category =
									SERVICES[form.mainCategory as keyof typeof SERVICES];
								const subCategory = category.subCategories.find(
									(sub) => sub.id === value
								);
								if (subCategory) {
									setSubCategory(value, subCategory.basePrice);
								}
							}}
							options={
								form.mainCategory
									? SERVICES[
											form.mainCategory as keyof typeof SERVICES
									  ].subCategories.map(({ id, name }) => ({
											value: id,
											label: name,
									  }))
									: []
							}
						/>
					</FormField>
				);
			case 2:
				return (
					<FormField label="날짜 선택" htmlFor="date">
						<DatePicker id="date" value={form.date} onChange={setDate} />
					</FormField>
				);
			case 3:
				return (
					<FormField label="지역 입력" htmlFor="location">
						<Input
							id="location"
							type="text"
							placeholder={TEXT.booking.locationPlaceholder}
							value={form.location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</FormField>
				);
			case 4:
				return (
					<FormField label="연락처 입력" htmlFor="contact">
						<Input
							id="contact"
							type="tel"
							placeholder={TEXT.booking.contactPlaceholder}
							value={form.contact}
							onChange={(e) => setContact(e.target.value)}
							pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{4}"
						/>
					</FormField>
				);
			default:
				return null;
		}
	};

	const renderConfirmation = () => {
		if (!isSubmitted) return null;

		return (
			<div className="text-center">
				<h3 className="mb-4 text-xl font-semibold text-primary">
					예약이 완료되었습니다!
				</h3>
				<p className="mb-6 text-text-primary">{TEXT.booking.confirmation}</p>
				<Button onClick={onClose}>닫기</Button>
			</div>
		);
	};

	if (isSubmitted) {
		return renderConfirmation();
	}

	return (
		<form onSubmit={(e) => e.preventDefault()} className="space-y-6">
			<StepIndicator steps={TEXT.booking.steps} currentStep={currentStep} />

			{renderStepContent()}

			{form.estimatedPrice > 0 && <PriceDisplay price={form.estimatedPrice} />}

			<div className="flex justify-between">
				<Button
					type="button"
					variant="outline"
					onClick={goToPrevStep}
					disabled={currentStep === 0}
				>
					이전
				</Button>

				<Button
					type="button"
					onClick={handleNextStep}
					disabled={!canGoNext || isSubmitting}
				>
					{currentStep === TEXT.booking.steps.length - 1 ? "예약하기" : "다음"}
				</Button>
			</div>
		</form>
	);
}
