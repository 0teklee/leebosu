import { useActionState, useState, useTransition } from "react";
import { BOOKING_TEXT, INIT_STATE } from "../constants";
import type { FormState } from "../types";
import { extractFormData, getCurrentKey } from "../utils";

export default function useBookFormAction(
	currentStep: number,
	go: (dir: -1 | 1) => void,
	triggerAnim: (fn: VoidFunction) => void
) {
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState(false);

	// FormState 업데이트 헬퍼 함수
	function updateFormState(
		prevState: FormState,
		formData: FormData
	): FormState {
		if (formData.get("reset_error")) {
			return { ...prevState, isError: false, isSuccess: false };
		}
		const key = getCurrentKey();
		const value = extractFormData(formData);
		const dir = Number(formData.get("direction")) as -1 | 1;
		const field = key && value ? { [key]: value } : {};
		return { ...prevState, ...field, animDirection: dir, isError: false };
	}

	/**
	 * @desc API 호출, URL 네비게이션 + 애니메이션 딜레이 사이드 이펙트 관리 헬퍼 함수
	 * @param nextState - 다음 폼 상태를 인자로 받음
	 * @returns 사이드 이펙트 결과 (API 요청 성공/실패 필드만 업데이트 혹은 빈 객체)
	 */
	async function handleSideEffects(
		nextState: FormState
	): Promise<Partial<FormState>> {
		const dir = nextState.animDirection;
		// NOTE: 마지막 단계에서 문자 전송 요청
		if (currentStep === BOOKING_TEXT.steps.length - 1) {
			setIsLoading(true);
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
				setIsLoading(false);
			}
		}

		// 애니메이션 + 네비게이션 (setTimeout + startTransition으로 지연 실행)
		// NOTE: 이벤트 루프로 아래의 return이 먼저 실행된 후 triggerAnim 실행
		triggerAnim(() => {
			startTransition(() => {
				go(dir);
			});
		});
		//  비어있는 필드를 반환 아래의 effects 변수에 할당
		return {};
	}

	// 폼 상태 업데이트 폼 액션 + 사이드 이펙트 관리 통합 함수
	const actionFn = async (
		prevState: FormState,
		formData: FormData
	): Promise<FormState> => {
		try {
			const next = updateFormState(prevState, formData);
			const effects = await handleSideEffects(next);
			return { ...next, ...effects };
		} catch (err) {
			console.error(err);
			return { ...prevState, isSuccess: false, isError: true };
		}
	};

	const [formState, formAction] = useActionState<FormState, FormData>(
		actionFn,
		INIT_STATE
	);

	return { formState, formAction, isPending, startTransition, isLoading };
}
