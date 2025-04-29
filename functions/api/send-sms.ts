import { sendNaverSMS } from "../../server/api.send-sms";

export interface Env {
	NAVER_ACCESS_KEY: string;
	NAVER_SECRET_KEY: string;
	NAVER_PHONE_NUMBER: string;
	BUSINESS_PHONE_NUMBER: string;
	NAVER_SERVICE_ID: string;
}

export async function onRequestPost({
	request,
	env,
}: {
	request: Request;
	env: Env;
}) {
	return sendNaverSMS({ request, env });
}
