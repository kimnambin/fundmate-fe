# 🤖 FundMate

> 프로젝트 목표 : 펀딩 사이트 개발 및 ai, 공공데이터 활용

<br>

## ☀️ status404 - FE

|                                          Frontend                                           |                                          Frontend                                          |                                          Frontend                                          |                                          Frontend                                           |
| :-----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/109705781?v=4" width=200px alt="강민경"/> | <img src="https://avatars.githubusercontent.com/u/86221268?v=4" width=200px alt="김성윤"/> | <img src="https://avatars.githubusercontent.com/u/86095931?v=4" width=200px alt="김태진"/> | <img src="https://avatars.githubusercontent.com/u/127464935?v=4" width=200px alt="김남빈"/> |
|                         [강민경](https://github.com/mingyeong0210)                          |                           [김성윤](https://github.com/tjddbs531)                           |                           [김태진](https://github.com/crossbat)                            |                           [김남빈](https://github.com/kimnambin)                            |
|                                   펀딩페이지<br>AI페이지                                    |                                 마이페이지<br>관리자페이지                                 |                             메인페이지 & 로그인<br>통계페이지                              |                                         결제페이지                                          |

<br>

## 🛠️ Development Environment

|    구분    |            도구            |
| :--------: | :------------------------: |
|   디자인   |           Figma            |
| 프레임워크 |    React + TypeScripts     |
|    MFE     |      Vite Federation       |
|  스타일링  | Tailwind Styled Components |
| 가상 서버  |     Mock Server (MSW)      |

<br>

## 💻 Convention

<details>
  <summary>🐈‍⬛ Git</summary>
  
  ### Branch
  - `main` : 배포 (직전)
  - `develop` : 개발 중
  - `기능/담당자` : 개별 작업 브랜치 
  ### Commit
  ```
  feat: 새로운 기능 추가
  fix: 버그 수정
  docs: 문서 작업 (README, 주석 등)
  style: 코드 스타일링 수정 (공백, 들여쓰기, 세미콜론 등 / 기능 변화 없음)
  refactor: 코드 리팩토링 (기능 변화 없음, 구조 개선 등)
  test: 테스트 코드 작성 및 수정
  chore: 빌드/패키지/설정 관련 작업 (ex. npm script, config 등)
  ci: CI/CD 설정 수정 (ex. Github Actions, Jenkins 등)
  ```
  ### PR
  - 제목 : [feat], [fix], [refactor], [docs] 등 태그 필수
  - 본문 : 작업 내용, 변경 사항, 관련 이슈, 체크리스트 포함
  - 크기 : 페이지 단위
  - 병합 조건 : 리뷰 1건 이상 + 팀 내 테스트 통과 
 <br> 
</details>

<details>
  <summary>✏️ Naming</summary>

|     구분     |                         이름                         |
| :----------: | :--------------------------------------------------: |
|     파일     |                     `camelCase`                      |
|   컴포넌트   |                     `PascalCase`                     |
|  변수·함수   |                     `camelCase`                      |
|    클래스    |      `PascalCase`<br>· 멤버·메소드: `camelCase`      |
|  인터페이스  | `PascalCase` (접두어 I 금지)<br>· 멤버 : `camelCase` |
| 타입(alias)  |         `PascalCase`<br>· 멤버 : `camelCase`         |
| 네임스페이스 |                     `PascalCase`                     |
|     enum     |          `PascalCase` (멤버도 `PascalCase`)          |
|    폴더명    |                     `kebab-case`                     |

  <br>
</details>

<details>
  <summary>🎬` Turborepo` Vite starter</summary>
  
  # `Turborepo` Vite starter

This is a community-maintained example. If you experience a problem, please submit a pull request with a fix. GitHub Issues will be closed.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-vite
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `docs`: a vanilla [vite](https://vitejs.dev) ts app
- `web`: another vanilla [vite](https://vitejs.dev) ts app
- `@repo/ui`: a stub component & utility library shared by both `web` and `docs` applications
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
<br>
</details>
