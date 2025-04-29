import { makeSignature } from "./api.util";

export interface Env {
	NAVER_ACCESS_KEY: string;
	NAVER_SECRET_KEY: string;
	NAVER_PHONE_NUMBER: string;
	BUSINESS_PHONE_NUMBER: string;
	NAVER_SERVICE_ID: string;
}

export async function sendNaverSMS({
	request,
	env,
}: {
	request: Request;
	env: Env;
}) {
	try {
		const formData = await request.json();
		const { mainCategory, subCategory, date, location, contact } = formData;

		const message = `
      LEEBOSU:새 예약이 들어왔습니다!
      ${mainCategory} - ${subCategory}
      ${date}
      ${location}
      ${contact}
    `;

		// Naver Simple Easy Notification Service (SENS) API 요청 준비
		const serviceId = env.NAVER_SERVICE_ID;
		const url = `/sms/v2/services/${serviceId}/messages`;
		const timestamp = Date.now().toString();
		const method = "POST";
		const accessKey = env.NAVER_ACCESS_KEY;
		const secretKey = env.NAVER_SECRET_KEY;

		// Signature 생성 @server/api.util.ts
		const signature = makeSignature(
			method,
			url,
			timestamp,
			accessKey,
			secretKey
		);

		// API 요청 데이터
		const body = {
			type: "SMS",
			contentType: "COMM",
			countryCode: "82",
			from: env.NAVER_PHONE_NUMBER,
			content: message,
			messages: [
				{
					to: env.BUSINESS_PHONE_NUMBER,
				},
			],
		};

		// SENS API 요청
		const response = await fetch(`https://sens.apigw.ntruss.com${url}`, {
			method: method,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-ncp-apigw-timestamp": timestamp,
				"x-ncp-iam-access-key": accessKey,
				"x-ncp-apigw-signature-v2": signature,
			},
			body: JSON.stringify(body),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(`SMS 발송 실패: ${result.statusName || "Unknown error"}`);
		}

		return new Response(
			JSON.stringify({
				success: true,
				requestId: result.requestId,
			}),
			{
				headers: { "Content-Type": "application/json" },
				status: 200,
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
