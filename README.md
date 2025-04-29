# [LEEBOSU.COM](https://leebosu.com)

https://leebosu.com

> Website for my father's home repair business

## Tech Stack / 기술 스택

- **Framework:** React ^19.0.0 (using `create-vite --template react-swc-ts`)
- **Styling:** Tailwind CSS v4.1
- **Build Tool: `Vite`**
- **SSG(MPA)+CSR:** `vite-plugin-ssr` (Minimal CSR: only `/book` route is client-rendered)
- **State Management:** React Hooks (incl. `useActionState`, `useTransition`), `localStorage` for form persistence
- **Package Manager:** Yarn
- **Deployment : Github Actions + Cloudflare Pages**

## USER FLOW / 사용자 흐름

- **Landing Page (`/`) / 랜딩 페이지 (`/`)**:
  - Introduces the service, shows pricing samples, and has a CTA ("지금 바로 예약하기") to the booking form.
  - 서비스 소개, 가격 샘플 표시, 예약 폼으로 연결되는 CTA ("지금 바로 예약하기") 포함.
- **About Page (`/about`) / 소개 페이지 (`/about`)**:
  - Provides more detail about Lee Bosu, his experience, and pricing philosophy. Includes a CTA ("예약하러 가기") to the booking form.
  - 이보수 상세 소개 (경험, 가격 정책). 예약 폼으로 연결되는 CTA ("예약하러 가기") 포함.
- **Booking Form (`/book`) / 예약 폼 (`/book`)**:
  - Accessible via CTAs on other pages. / 다른 페이지의 CTA를 통해 접근 가능.
  - Mobile-first, dialog-style multi-step form. / 모바일 우선, 대화형 다단계 폼.
  - Steps: Service Category -> Subcategory -> Date -> Location -> Contact Info. / 단계: 대분류 -> 소분류 -> 날짜 -> 지역 -> 연락처.
  - Shows an estimated price before submission. / 제출 전 예상 견적 표시.
  - No user login required. / 사용자 로그인 불필요.
- **Submission / 제출**:
  - User confirms the booking. A confirmation message is shown, indicating details will be sent via SMS(NAVER SENS).
  - 사용자가 예약 확정. 예약 내용이 SMS(네이버 SENS)로 전송될 것임을 알리는 확인 메시지 표시.

## BUILD & DEPLOY PIPELINE / 빌드 및 배포 파이프라인

```mermaid
graph TD
    A[Local Development (`yarn dev`)] --> B{Build (`yarn build`)};
    B --> C[Static Site Generation (via vite-plugin-ssr)];
    C --> D[Deploy `dist` folder];
```
