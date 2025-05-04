/**
 * Naver Cloud Platform API 요청에 대한 서명 생성.
 * @param method HTTP 메서드 (GET, POST, etc.)
 * @param url 요청 URL
 * @param timestamp 현재 타임스탬프
 * @param accessKey 네이버 클라우드 플랫폼 액세스 키
 * @param secretKey 네이버 클라우드 플랫폼 시크릿 키
 * @returns Base64 인코딩된 서명
 * @see https://api.ncloud-docs.com/docs/common-ncpapi
 * @example
 * const timestamp = Date.now().toString();
 * const method = "POST";
 * const url = "/sms/v2/services/{serviceId}/messages";
 * const signature = getSignature(method, url, timestamp, accessKey, secretKey); // 서명 생성
 * 문서 내용 참조: API 요청 헤더에 적용
 * headers: {
 *   "Content-Type": "application/json; charset=utf-8",
 *   "x-ncp-apigw-timestamp": timestamp,
 *   "x-ncp-iam-access-key": accessKey,
 *   "x-ncp-apigw-signature-v2": signature
 * }
 */
async function getSignature(
	method: string,
	url: string,
	timestamp: string,
	accessKey: string,
	secretKey: string
): Promise<string> {
	const space = " ";
	const newLine = "\n";
	const message =
		method + space + url + newLine + timestamp + newLine + accessKey;

	// 1. 비밀 키를 CryptoKey로 가져옴.
	const key = await crypto.subtle.importKey(
		"raw", // 형식
		new TextEncoder().encode(secretKey),
		{ name: "HMAC", hash: "SHA-256" },
		false, // 추출 가능 여부
		["sign"] // 사용 용도
	);

	// 2. 메시지에 대해 서명(HMAC)을 생성.
	const signatureBuffer = await crypto.subtle.sign(
		"HMAC", // 알고리즘
		key, // CryptoKey
		new TextEncoder().encode(message) // 서명할 데이터
	);

	// 3. (TEST) ArrayBuffer를 Base64 문자열로 인코딩.
	const signatureBase64 = btoa(
		String.fromCharCode(...new Uint8Array(signatureBuffer))
	);
	return signatureBase64;
}

export { getSignature };
