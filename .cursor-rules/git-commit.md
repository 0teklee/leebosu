Rule Name: git-commit
Description:

- Make multiple commits following the Angular commit convention.
- Target only files shown as "modified" or "untracked" in `git status` (exclude yarn.lock).
- Group related changes by job and scope using `git diff` to determine logical commit boundaries. Each group should be committed together.
- Commit message prefix must follow the Angular commit convention, and the detailed message should be written in Korean.

Example:

- feat: 새로운 예약 폼 단계 추가
- fix: 견적 미리보기 오류 수정
