import * as CryptoJS from "crypto-js";

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
 * const signature = makeSignature(method, url, timestamp, accessKey, secretKey); // 서명 생성
 * 문서 내용 참조: API 요청 헤더에 적용
 * headers: {
 *   "Content-Type": "application/json; charset=utf-8",
 *   "x-ncp-apigw-timestamp": timestamp,
 *   "x-ncp-iam-access-key": accessKey,
 *   "x-ncp-apigw-signature-v2": signature
 * }
 */
export function makeSignature(
	method: string,
	url: string,
	timestamp: string,
	accessKey: string,
	secretKey: string
): string {
	const space = " ";
	const newLine = "\n";

	// HMAC-SHA256 인스턴스 생성
	const hmac = CryptoJS.HmacSHA256(
		method + space + url + newLine + timestamp + newLine + accessKey,
		secretKey
	);

	// Base64로 변환
	return CryptoJS.enc.Base64.stringify(hmac);
}
