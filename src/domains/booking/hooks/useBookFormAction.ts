import { useActionState, useState, useTransition } from "react";
import { INIT_STATE } from "../constants";
import {
	FORM_FIELDS_MAP,
	FORM_FIELDS_STEP_MAP,
	type FormState,
} from "../types";

/**
 * @desc 폼 상태 업데이트 폼 액션 관리 통합 훅
 */
export default function useBookFormAction() {
	const [isTransitionPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false); // API 요청 로딩 상태
	const [formState, formAction] = useActionState<FormState, FormData>(
		async (prevState: FormState, formData: FormData) => {
			// 에러 초기화 처리
			if (formData.get("reset_error")) {
				return { ...prevState, isError: false, isSuccess: false };
			}

			// API 결과 반영
			if (formData.has("isSuccess") || formData.has("isError")) {
				return {
					...prevState,
					isSuccess: formData.get("isSuccess") === "true",
					isError: formData.get("isError") === "true",
				};
			}

			// 폼 상태 업데이트
			const updatedState = updateFormState(prevState, formData);

			return { ...updatedState, isError: false };
		},
		INIT_STATE
	);

	/**
	 * @desc 폼 데이터 업데이트 처리 - FormState를 필드별로 reduce로 순회하며 변경된 값이 있는 필드만 업데이트
	 * @param prevState - 이전 FormState
	 * @param formData - 업데이트할 FormData
	 * @returns 업데이트된 FormState
	 */
	function updateFormState(
		prevState: FormState,
		formData: FormData
	): FormState {
		return FORM_FIELDS_MAP.reduce<FormState>(
			(acc, key) => {
				const val = formData.get(key);

				if (!formData.has(key) || val === prevState[key] || val === undefined) {
					return acc;
				}

				(acc[key] as FormState[typeof key]) = val as FormState[typeof key];

				if (key === "mainCategory" && prevState.mainCategory !== val) {
					acc.subCategory = null;
				}

				return acc;
			},
			{ ...prevState }
		);
	}

	/**
	 * @desc API 요청 처리 - 폼 데이터 제출 후 결과 반환
	 * @param formState - 제출할 FormState
	 * @returns API 응답의 isSuccess, isError 여부를 반영한 FormState 반환
	 */
	async function postFormData(payload: FormData) {
		setIsFetching(true);
		try {
			const obj = Object.fromEntries(payload.entries());

			const response = await fetch("/api/send-sms", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(obj),
			});
			const result = await response.json();
			return {
				...payload,
				isSuccess: result.success,
				isError: !result.success,
			};
		} catch (err) {
			console.error(`[useBookFormAction] API 요청 실패:${err}`);
			return { ...payload, isSuccess: false, isError: true };
		} finally {
			setIsFetching(false);
		} /*  */
	}

	/**
	 * @desc navigate 여부를 결정하는 헬퍼 함수 - 훅 내부의 formState에 의존하는 외부효과 함수
	 * @param currentStep - 현재 폼 단계
	 * @returns navigate 여부 T/F
	 */
	function shouldNavigateToNext(currentStep: number): boolean {
		const currentStepFields = FORM_FIELDS_STEP_MAP[currentStep];
		return currentStepFields.every(
			(field) => formState[field] ?? formState[field]
		);
	}

	return {
		formState,
		formAction,
		isTransitionPending,
		isFetching,
		startTransition,
		shouldNavigateToNext,
		postFormData,
	};
}
