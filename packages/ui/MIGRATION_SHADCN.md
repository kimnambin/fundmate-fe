# shadcn/ui 마이그레이션 노트

`@repo/ui`의 디자인 시스템 컴포넌트를 자체 styled-components 구현에서 **shadcn/ui(Radix + Tailwind)** 기반으로 교체했습니다. 모든 앱(`admin`, `funding`, `main`, `mypage`, `payment`, `statistics`)이 `@repo/ui`를 공유하므로 이 패키지만 바뀌면 전체 앱에 자동 반영됩니다.

## 변경 사항

- `packages/ui/components/ui/` 신설: shadcn/ui 표준 프리미티브(`Button`, `Card`, `Dialog`, `DropdownMenu`, `Input`)를 직접 작성해 추가. CLI 대신 수동으로 작성한 이유는 모노레포 구조상 `components.json` 기반 CLI가 서브패키지를 잘 인식하지 못하기 때문입니다.
- 기존 컴포넌트는 **외부 API(props)를 그대로 유지**한 채 내부 구현만 shadcn 프리미티브로 교체했습니다. 즉 앱 코드(`<MainButton label=... />`, `<Modal isOpen=... />` 등)는 수정할 필요가 없습니다.
  - `MainButton`, `FollowingButton` → `ui/button`(CVA variants) 기반
  - `HorizontalCard`, `VerticalCard` → `ui/card` 기반
  - `Modal` → `ui/dialog`(Radix Dialog) 기반 — 접근성(포커스 트랩, ESC 닫기, 스크린리더)이 기본 제공됩니다
  - `StatusDropdown`, `CompleteDropdown`, `RecommendDropdown` → `ui/dropdown-menu`(Radix) 기반 — 기존에 직접 구현했던 외부 클릭 감지 로직(`useRef` + `mousedown` 리스너)이 필요 없어졌습니다
  - `InputText` → `ui/input` 기반
- 제거된 파일: `styles/Button.styles.ts`, `styles/Card.style.ts`, `styles/Dropdown.Style.ts`, `styles/modal.style.ts`, `styles/Input.style.ts` (모두 `tailwind-styled-components` 기반 구현이었고, 대체된 컴포넌트 외에는 참조하는 곳이 없음을 확인했습니다)
- `tailwind-preset.js`: `tailwindcss-animate` 플러그인 추가(Dialog/DropdownMenu의 열림·닫힘 애니메이션에 필요), `borderRadius` 토큰 추가. 기존 브랜드 컬러(`main`, `sub-color` 등)는 그대로 유지해 비주얼 톤은 크게 바뀌지 않습니다.
- `package.json`: `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `lucide-react` 추가.

## 그대로 둔 것

- `Header`, `Footer`, `Sidebar`, `Loading`, `GlobalLoadingBar`, `UserPageLayout`, `NotFound`, 타이포그래피(`Title`/`SubTitle`/`MediumFont` 등)는 이번 범위에서 제외했습니다. 디자인 시스템의 "컴포넌트"보다는 레이아웃/타이포그래피 성격이 강해 shadcn이 다루는 영역과 겹치지 않는다고 판단했습니다. 필요하시면 이어서 작업해드릴 수 있습니다.
- `styled-components` / `tailwind-styled-components` 의존성은 위 컴포넌트들이 여전히 쓰고 있어 그대로 남겨뒀습니다.

## 설치 및 확인 방법

이 브랜치를 받은 뒤:

```bash
npm install
npm run dev
```

`packages/ui` 변경사항은 각 앱 빌드 시 자동 반영됩니다. 타입 체크는 `npm run type-check`로 확인해주세요 (이 세션에서는 모노레포 의존성 설치를 하지 않아 로컬 빌드로 최종 검증은 못 했습니다).
