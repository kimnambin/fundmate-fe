# 테스트 시나리오

대상: `perf/funding-bundle-size` (funding 앱 번들 최적화 + 마크다운 에디터 교체)

## 0. 사전 준비

```bash
npm install
cp .env.example .env        # VITE_BACKEND_ADDRESS=http://localhost:3000
npm run build               # 앱 6개 빌드 (remoteEntry 생성)
npm run dev:all             # remote 5개 preview + main dev(5000)
```

포트: main 5000, admin 5001, funding 5002, mypage 5003, payment 5004, statistics 5005.
브라우저에서 `http://localhost:5000` 접속. 백엔드(3000)가 없으면 API 의존 항목은 MSW 목데이터 또는 에러 화면으로 나온다.

## 1. 기본 구동 (스모크)

| # | 절차 | 기대 결과 |
|---|---|---|
| 1-1 | `npm run type-check`, `npm run build` | 12개 태스크 모두 성공, 에러 없음 |
| 1-2 | `/` 접속 | 메인 화면과 Header/Footer 렌더링, 콘솔 에러 없음 |
| 1-3 | 개발자도구 Network | `remoteEntry.js` 5개(5001~5005)가 200으로 로드 |
| 1-4 | 새로고침, 뒤로가기 | 화면 유지, 흰 화면 없음 |

## 2. 라우트 / Module Federation 연동

각 경로로 직접 접속해서 Loading 후 화면이 뜨는지 확인한다.

| # | 경로 | 출처 앱 | 기대 결과 |
|---|---|---|---|
| 2-1 | `/login`, `/signup`, `/reset` | main | 폼 정상 표시 |
| 2-2 | `/search` | main | 검색 화면 표시 |
| 2-3 | `/funding/create` | funding | 펀딩 개설 폼 표시 |
| 2-4 | `/fundi/request` | funding | 펀디 질문 화면 |
| 2-5 | `/product/1`, `/payment/1` | payment | 상품/결제 화면 |
| 2-6 | `/statistics` | statistics | 통계 화면, 차트 표시 |
| 2-7 | `/mypage`, `/mypage/projects/liked` | mypage | 마이페이지, 좋아요 목록 |
| 2-8 | `/mypage/history`, `/mypage/sellstats` | admin | 펀딩 내역, 판매 통계 |
| 2-9 | `/user/settings` | mypage | 프로필 설정 |

## 3. 이번 변경 집중 검증

### 3-A. 마크다운 에디터 교체 (`/funding/create`)

| # | 절차 | 기대 결과 |
|---|---|---|
| 3-1 | 페이지 진입 | 프로젝트 소개 영역에 에디터 표시, 로딩 중에는 400px 빈 영역 |
| 3-2 | placeholder 확인 | "프로젝트(펀딩)에 대한 설명을 작성해주세요!" 표시 |
| 3-3 | `# 제목`, `**굵게**`, 목록 입력 | 미리보기에 마크다운 반영 |
| 3-4 | 내용 입력 후 전체 삭제 | 상태가 빈 문자열이 되고, 제출 시 "프로젝트 소개를 작성해주세요." 경고 표시 |
| 3-5 | 내용 입력 후 제출 | 입력한 값이 요청 body에 포함 (Network 확인) |
| 3-6 | 툴바(굵게, 링크 등) 클릭 | 해당 서식이 텍스트에 삽입 |

### 3-B. 펀디 AI 요약 모달 (`/funding/create`)

| # | 절차 | 기대 결과 |
|---|---|---|
| 3-7 | 소개 작성 후 펀디 버튼 클릭 | 모달 오픈, 요약 결과가 마크다운으로 렌더링 |
| 3-8 | 내용이 없을 때 모달 오픈 | "입력한 내용이 없습니다." 표시 |
| 3-9 | 복사 버튼 클릭 | 체크 아이콘으로 전환, 클립보드에 복사 |
| 3-10 | 닫기(X) | 모달 닫힘 |

### 3-C. 분석 결과 페이지 (`/fundi/request` 분석 후 `/fundi/response`)

| # | 절차 | 기대 결과 |
|---|---|---|
| 3-11 | 분석 요청 후 결과 페이지 진입 | 지도, 파이차트, 마크다운 결과가 순서대로 표시 (지도/차트는 lazy라 잠시 후 나타남) |
| 3-12 | "저장하기" 클릭 | PDF(`FundiResult.pdf`) 다운로드, 지도/차트/본문이 잘리지 않음 |
| 3-13 | Network 확인 | `html2pdf` 청크가 저장 클릭 시점에만 로드 |
| 3-14 | 직접 `/fundi/response` 접속 (state 없음) | 크래시 없이 렌더링 (본문만 비어 있음) |
| 3-15 | "메인페이지로 돌아가기" | `/`로 이동 |

### 3-D. 번들 분리 확인

| # | 절차 | 기대 결과 |
|---|---|---|
| 3-16 | `http://localhost:5002` standalone 접속 | 각 라우트 진입 시 해당 청크만 추가 로드 |
| 3-17 | `/funding/create` Network | 에디터 청크(~400kB)가 이 페이지에서만 로드 |
| 3-18 | 빌드 로그 | 500kB 초과 청크 경고 없음 (html2pdf만 524kB, 허용치 550) |

## 4. 회귀 확인

| # | 절차 | 기대 결과 |
|---|---|---|
| 4-1 | `/funding/detail/:id` (funding standalone) | 상세 페이지, 탭 정상 |
| 4-2 | 펀딩 개설 폼의 날짜 선택(react-datepicker) | 달력 열림, 선택 반영 |
| 4-3 | 카테고리/옵션 추가 모달 | 정상 동작 |
| 4-4 | 이미지 업로드 | 미리보기 표시 (`@repo/ui/image-upload`) |
| 4-5 | 반응형 | 모바일 폭(375px)에서 가로 스크롤 없음 |

## 5. 합격 기준

- 콘솔에 에러 없음. 특히 `Failed to fetch dynamically imported module`, `remoteEntry` 로딩 실패가 없어야 한다.
- 3-A ~ 3-C는 이번 변경의 핵심이므로 하나라도 실패하면 머지하지 않는다.

## 6. 알려진 의도된 변경

- 에디터가 CodeMirror 기반에서 textarea 기반(`@uiw/react-md-editor`)으로 바뀌어 툴바 모양과 편집 UX가 다르다.
- 에디터/미리보기 모두 코드 블록 구문 강조 색상이 없다 (`nohighlight`).
