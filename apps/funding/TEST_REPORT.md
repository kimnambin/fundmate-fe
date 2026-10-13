# 테스트 실행 결과 (Playwright)

- 대상: `perf/funding-bundle-size` (`ea6366c`)
- 환경: remote 5개 build + `vite preview`(5001~5005), main dev(5100), 백엔드 없음(MSW 목데이터), Chromium headless
- 시나리오: `TEST_SCENARIO.md`
- 총 26개 항목 중 PASS 18 / WARN 5 / FAIL 3 + 추가 확인 (아래)

## 1. 이번 변경(PR)으로 생긴 문제

### [E-1] 호스트(main)에서 에디터 CSS가 로드되지 않아 레이아웃이 깨짐 — 심각도 높음 (해결됨)
- 경로: `main` → `/funding/create` (표준 사용 경로)
- 증상: 마크다운 에디터 툴바 아이콘이 세로로 한 줄씩 풀어져 나열되고, textarea가 작은 박스(약 180×50px)로 축소됨. 미리보기와 입력창이 분리되지 않음. (스크린샷 `3-3.png`)
- 콘솔: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"`
- 원인: lazy 분리된 청크의 preload 의존성(JS/CSS)이 **remote(5002)가 아니라 호스트 origin(5100)의 `/assets/...`** 로 요청되어 SPA fallback(index.html)이 응답됨.
  ```
  200 text/html  localhost:5100/assets/nohighlight-CTOJClKK.css
  200 text/html  localhost:5100/assets/index-C83mYnk9.css
  200 text/html  localhost:5100/assets/nohighlight-CxS6z4p9.js
  200 text/html  localhost:5100/assets/index.nohighlight-BQjWmbGU.js
  ```
- 비교: funding standalone(`localhost:5002/funding/create`)에서는 같은 파일이 정상 로드(실패 0건).
- 판단: `React.lazy`로 새로 분리한 청크에서 발생하는 것으로 PR 변경 때문인 것으로 보임.
  (`main` 브랜치 기준 빌드와의 직접 비교는 환경 문제로 수행하지 못함.)
- 제안: 에디터를 lazy 하지 않고 정적 import 하거나(expose 청크의 CSS는 federation이 정상 주입), `experimental.renderBuiltUrl` / `base`를 remote의 절대 URL로 지정, 또는 에디터 CSS를 `global.ts`에서 정적 import.

### [E-2] html2pdf 청크 preload가 호스트 origin으로 요청됨 — 심각도 낮음 (해결됨)
- 증상: "저장하기" 클릭 시 `localhost:5100/assets/html2pdf.es-Y3xt84zs.js`가 3회 요청되어 html을 받음 (PDF 저장 자체는 성공, 114KB).
- 원인/조치: E-1과 동일. 동작에는 영향 없고 불필요한 요청과 콘솔 에러만 발생.

## 2. 이번 변경과 무관해 보이는 기존 문제

### [E-3] `/mypage/history` 흰 화면 (PAGEERROR) — 심각도 높음
- `TypeError: Cannot read properties of undefined (reading 'toLocaleString')` → `#root`가 비어 있음
- 선행: `펀딩 리스트 조회 실패: TypeError: Cannot read properties of undefined (reading 'map')` (admin `FundingHistory`)
- 원인: 백엔드/목데이터가 없을 때 API 응답을 검증하지 않고 `.map`/`.toLocaleString` 호출. 에러 바운더리가 없어 앱 전체가 비워짐.

### [E-4] `/mypage/sellstats` 통계 그래프 로드 실패 — 심각도 중간
- `통계 그래프 데이터 로드 실패: TypeError: Cannot read properties of undefined (reading 'map')` (admin `StatsPage`)
- 화면은 일부 렌더링(605자)되나 그래프가 비어 있음.

### [E-5] `/mypage/projects/liked` 목록 조회 실패 — 심각도 중간
- `찜한 프로젝트 조회 실패: TypeError: (intermediate value).data.map is not a function` (mypage `LikedProjects`)
- E-3~E-5는 admin/mypage 앱이며 이번 PR에서 수정하지 않은 파일. 백엔드 미연결 상태에서 `/api`가 HTML을 반환해 발생. 백엔드 연결 시 재확인 필요.

### [E-6] React 경고: `isError` prop이 DOM으로 전달됨
- `React does not recognize the isError prop on a DOM element` (`/funding/create`, `/fundi/request`)
- styled-components에서 `$isError`(transient prop)를 쓰지 않아서 발생. 동작에는 영향 없음.

### [E-7] MSW 서비스 워커 등록 실패 (테스트 환경 한정)
- `[MSW] Failed to register the Service Worker` — Playwright에서 `serviceWorkers: 'block'` 사용 시에만 발생.

## 3. 통과한 항목
| 시나리오 | 결과 |
|---|---|
| 1-2 메인 렌더링 | PASS |
| 2-1~2-2, 2-5, 2-6, 2-7a, 2-9 라우트 (login, signup, reset, search, product, payment, statistics, mypage, settings) | PASS |
| 2-3, 2-4 `/funding/create`, `/fundi/request` | 렌더링 PASS, E-1/E-6 경고 |
| 3-1/3-2 에디터 표시, placeholder | PASS |
| 3-3 마크다운 입력 → 미리보기(h1, strong, li) | PASS (단, E-1로 스타일 깨짐) |
| 3-7 AI 요약 모달 | PASS |
| 3-11 펀디 요청 → 결과 페이지, 지도/차트(svg 5개), 마크다운 | PASS |
| 3-12 PDF 저장 (`FundiResult.pdf`, 114KB) | PASS |
| 3-13 html2pdf가 저장 클릭 시점에 로드 | PASS |
| 3-14 state 없이 `/fundi/response` 직접 접속 | PASS |
| 3-16 funding standalone(5002) | PASS, 에러 0건 |
| 4-5 모바일 375px 가로 스크롤 (/, /funding/create, /fundi/request) | PASS |

## 4. 검증하지 못한 항목
- 3-4~3-6(에디터 값 삭제/제출/툴바), 3-8~3-10(모달 빈 상태, 복사, 닫기), 4-1~4-4(상세, 날짜 선택, 모달, 이미지 업로드)
- 백엔드 연동이 필요한 항목(로그인, 실제 AI 응답, 이미지 업로드)
- AI API 2개(`/api/ai/summarize`, `/api/ai/requests`)는 Playwright로 stub 처리함.
- PDF 내용(지도/차트/본문 잘림)은 육안 확인 안 함. 파일 생성과 크기만 확인.

## 5. 수정 및 재검증 (E-1, E-2)
- 수정: `vite.config.ts`의 `experimental.renderBuiltUrl`로 lazy 청크의 preload 의존성(JS/CSS)을 청크 자신의 URL 기준으로 해석하도록 변경.
- 재검증(main 5100 → `/funding/create`, `/fundi/*`):
  - JS/CSS 요청 중 HTML 응답: 7건 → **0건**
  - 에디터 툴바/편집·미리보기 분할 레이아웃 정상 (스크린샷 확인)
  - html2pdf 청크 요청 origin: 5100 → **5002**, PDF 저장 정상 (118KB)
  - 번들 분리는 그대로 유지 (정적 import로 되돌리지 않음)
- E-3 ~ E-6은 이번 수정과 무관하며 그대로 남아 있음.
