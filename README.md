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

- **Landing Page 랜딩 페이지 (`/`)**:
  - Introduces the service, shows pricing samples, and has a CTA ("지금 바로 예약하기") to the booking form.
  - 서비스 소개, 가격 샘플 표시, 예약 폼으로 연결되는 CTA ("지금 바로 예약하기") 포함.
- **About Page 소개 페이지 (`/about`)**:
  - Provides more detail about Lee Bosu, his experience, and pricing philosophy. Includes a CTA ("예약하러 가기") to the booking form.
  - 이보수 상세 소개 (경험, 가격 정책). 예약 폼으로 연결되는 CTA ("예약하러 가기") 포함.
- **Booking Form 예약 폼 (`/book`)**:
  - Accessible via CTAs on other pages. / 다른 페이지의 CTA를 통해 접근 가능.
  - Mobile-first, dialog-style multi-step form. / 모바일 우선, 대화형 다단계 폼.
  - Steps: Service Category -> Subcategory -> Date -> Location -> Contact Info. / 단계: 대분류 -> 소분류 -> 날짜 -> 지역 -> 연락처.
  - Shows an estimated price before submission. / 제출 전 예상 견적 표시.
  - No user login required. / 사용자 로그인 불필요.
- **Submission 제출**:
  - User confirms the booking. A confirmation message is shown, indicating details will be sent via SMS(NAVER SENS).
  - 사용자가 예약 확정. 예약 내용이 SMS(네이버 SENS)로 전송될 것임을 알리는 확인 메시지 표시.

## BUILD & DEPLOY PIPELINE / 빌드 및 배포 파이프라인

```mermaid
stateDiagram-v2
    [*] --> MAIN : main 브랜치에 푸시(LOCAL → REMOTE)


    state "GitHub Actions" as GA {
        MAIN --> Checkout_Code  : 워크플로우 시작 (Workflow starts)
        Checkout_Code --> Setup_Node : 코드 체크아웃 완료 (Code checked out)

        Setup_Node : SETUP Node.js v22 + yarn (Node.js + yarn 설정)
        Setup_Node --> Install_Deps : 설정 완료 (Setup complete)

        Install_Deps : INSTALL yarn pkgs (의존성 설치)
        Install_Deps --> Build_Project : 설치 완료 (Install complete)

        Build_Project : BUILD vite build && ssg.ts build (프로젝트 빌드)
        Build_Project --> Configure_Git : 빌드 완료 (Build complete)

        Configure_Git : CONFIGURE Git (Git 설정)
        Configure_Git --> Commit_Push_Production : 설정 완료 (Configure complete)

        Commit_Push_Production : DEPLOY commit dist, functions & push (배포 커밋 및 푸시)
        note right of Commit_Push_Production
            dist, functions, wrangler.toml 포함하여
            production 브랜치로 푸시
        end note
    }

    Commit_Push_Production --> Trigger_Cloudflare : production 브랜치 푸시됨 (Pushed to production branch)

    state "Cloudflare Pages" as CF {
         Trigger_Cloudflare --> Deploy_Assets : Cloudflare 트리거됨 (Cloudflare triggered)
         Deploy_Assets : 정적 에셋 배포 (dist 폴더) (Deploy Static Assets from dist)
         Deploy_Assets --> Deploy_Functions : 에셋 배포 완료 (Assets deployed)
         Deploy_Functions : Functions 배포 (functions 폴더) (Deploy Functions from functions)
         Deploy_Functions --> Apply_Settings : Functions 배포 완료 (Functions deployed)
         Apply_Settings: 환경변수 및 비밀키 적용 (Apply Env Vars & Secrets)
         Apply_Settings --> [*] : 배포 완료 (Deployment complete)
         note left of Apply_Settings
            wrangler.toml 설정 및
            BUSINESS_PHONE_NUMBER, NAVER_* 등 적용
         end note
    }
```

## CURSOR Rules

- Cursor IDE의 rules를 적용하여 다음 원칙을 지키려 했습니다.
  1. Ask 모드 위주로 사용한다.
  2. 모르는 코드는 기술 부채다.
  3. 주석을 작성한다.
-  `cursor`를 사용하며 느낀 점과 자세한 LLM 사용 원칙과을 추후 블로그에 남기겠습니다.

### Development Guidelines / 개발 가이드라인
[always.mdc](https://github.com/0teklee/leebosu/tree/main/cursor/always.mdc)
- **Test First:** Run tests before any code changes / 코드 변경 전 테스트 실행 필수
- **File Structure:** Use `tree` command to understand codebase structure / `tree` 명령어로 코드베이스 구조 파악
- **Dependency Management:** Use Yarn / Yarn 패키지 매니저 사용
- **Frontend Stack:**
  - Tailwind CSS v4.1 for styling / 스타일링
  - React ^19.0.0 with modern patterns / 최신 React 패턴 적용
  - Maximize usage of React 19's hooks and concurrency features / React 19 훅스와 동시성 기능 적극 활용

### Git Commit Convention / 깃 커밋 규칙
[git-commit.mdc](https://github.com/0teklee/leebosu/tree/main/cursor/git-commit.mdc)

- **Format:** Follow Angular commit convention / Angular 커밋 컨벤션 준수
- **Grouping:** Group related files and changes in single commit / 연관된 파일과 변경사항 하나의 커밋으로 그룹화
- **Scope:** Target modified and untracked files from git status / git status의 수정 및 추적되지 않은 파일 대상
- **Exclusion:** Exclude yarn.lock from commits / yarn.lock 파일 커밋에서 제외
