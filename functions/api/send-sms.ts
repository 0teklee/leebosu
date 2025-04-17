export interface Env {
	TWILIO_ACCOUNT_SID: string;
	TWILIO_AUTH_TOKEN: string;
	TWILIO_PHONE_NUMBER: string;
	BUSINESS_PHONE_NUMBER: string;
}

export async function onRequestPost({
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

		// Twilio API 호출
		const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;

		const twilioResponse = await fetch(twilioEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization:
					"Basic " + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
			},
			body: new URLSearchParams({
				To: env.BUSINESS_PHONE_NUMBER,
				From: env.TWILIO_PHONE_NUMBER,
				Body: message,
			}).toString(),
		});

		if (!twilioResponse.ok) {
			throw new Error("Twilio API 호출 실패");
		}

		return new Response(
			JSON.stringify({
				success: true,
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
				error: error.message,
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
