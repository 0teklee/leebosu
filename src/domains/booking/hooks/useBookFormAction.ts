import { useActionState, useState, useTransition } from "react";
import { BOOKING_TEXT, INIT_STATE } from "../constants";
import type { FormState, TAnimDirection } from "../types";
import { extractFormData, getCurrentKey } from "../utils";

/**
 * @desc 폼 상태 업데이트 폼 액션 + 사이드 이펙트 관리 통합 함수
 * @param currentStep - 현재 폼 단계
 * @param navigate - 폼 상태 업데이트 이후 반드시 다음 페이지로 이동
 * @returns 폼 상태 업데이트 폼 액션 + useActionState + transition, api loading, 결과 반환
 */
export default function useBookFormAction(
	currentStep: number,
	navigate: () => void
) {
	const [isTransitionPending, startTransition] = useTransition();
	const [isFetching, setIsFetching] = useState(false); // api 요청 로딩 상태

	const [formState, formAction] = useActionState<FormState, FormData>(
		actionFn,
		INIT_STATE
	);

	// 폼 상태 업데이트 폼 액션 + 사이드 이펙트 관리 통합 함수
	async function actionFn(
		prevState: FormState,
		formData: FormData
	): Promise<FormState> {
		try {
			const next = updateFormState(prevState, formData);
			const effects = await handleSideEffects(next);
			navigate(); // 폼 상태 업데이트 이후 반드시 다음 페이지로 이동
			return { ...next, ...effects };
		} catch (err) {
			console.error(err);
			return { ...prevState, isSuccess: false, isError: true };
		}
	}

	/**
	 * @desc 폼 상태 업데이트 헬퍼 함수 - formData 파싱 후 선택된 필드만 추가하여 반환 (요청 에러 이후 reset 포함)
	 * @param prevState - 이전 폼 상태를 인자로 받음
	 * @param formData - 폼 데이터를 인자로 받음
	 * @returns 업데이트된 폼 상태
	 */
	function updateFormState(
		prevState: FormState,
		formData: FormData
	): FormState {
		if (formData.get("reset_error")) {
			return { ...prevState, isError: false, isSuccess: false };
		}
		const [key, value, dir] = [
			getCurrentKey(),
			extractFormData(formData),
			Number(formData.get("animDirection")) as TAnimDirection, // 트랜지션 방향 FormState.animDirection 필드 값
		];

		const updateField = (() => {
			if (key === "mainCategory" && prevState.mainCategory !== value) {
				return {
					...prevState,
					[key]: value,
					subCategory: null,
				};
			}
			if (key && value) {
				return { [key]: value };
			}
			return {};
		})() as Partial<FormState>;

		return { ...prevState, ...updateField, animDirection: dir, isError: false };
	}

	/**
	 * @desc API 호출, URL 네비게이션 + 애니메이션 딜레이 사이드 이펙트 관리 헬퍼 함수
	 * @param nextState - 다음 폼 상태를 인자로 받음
	 * @returns 사이드 이펙트 결과 (API 요청 성공/실패 필드만 업데이트 혹은 빈 객체)
	 */
	async function handleSideEffects(
		nextState: FormState
	): Promise<Partial<FormState>> {
		// NOTE: 마지막 단계에서 문자 전송 요청
		if (currentStep === BOOKING_TEXT.steps.length - 1) {
			setIsFetching(true);
			try {
				const response = await fetch("/api/send-sms", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(nextState),
				});
				const result = await response.json();
				return { isSuccess: result.success, isError: !result.success };
			} catch (err) {
				console.error(err);
				return { isSuccess: false, isError: true };
			} finally {
				// NOTE: isSuccess/isError 여부에 따라 네비게이션 없이 리렌더링 -> 후에 @pages에서 버튼 클릭으로 닫기/이전 단계로 이동
				setIsFetching(false);
			}
		}

		//  비어있는 필드를 반환 아래의 effects 변수에 할당
		return {};
	}

	return { formState, formAction, isTransitionPending, startTransition, isFetching };
}
