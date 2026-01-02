# mantech-portfolio-web — Ops Console Portfolio

운영자(Ops) 관점 UX를 목표로 만든 프론트엔드 운영 콘솔 샘플입니다.  
**IT 운영 자동화(MDRM-IT)** 와 **재해복구(MDRM-DR)** 흐름을 하나의 콘솔 UX로 묶고,  
서버 상태(Server State)를 **TanStack Query**로 표준화하여 **Loading / Error / Empty** 상태까지 일관되게 처리합니다.

---

## 주요 라우트

- `/ops/it/dashboard` : 시스템 상태 카드 + 배포 지표 차트(스켈레톤/에러/빈상태)
- `/ops/it/deploy` : 배포 이력 + 배포 상태 배지(운영자 관점 UX)
- `/ops/it/batch` : 배치 작업 목록 + 마지막 실행/평균 소요 + 성공/실패 상태
- `/ops/it/workflows` : 운영 워크플로우(자동화 관점)
- `/ops/it/checks` : Daily Checks(점검/승인 관점)
- `/ops/dr/overview` : DR 시나리오 상태 + RPO/RTO 지표 요약
- `/ops/dr/runbooks` : DR Runbook(절차/체크포인트 UI)
- `/ops/dr/drills` : DR Drill 이력(훈련 결과/리스크/개선 포인트)

---

## 프론트 아키텍처

### 폴더 구조(핵심)

```txt
src/
├─ api/          # 데이터 소스 계층 (mock/real 교체 지점)
├─ queries/      # 서버 상태 관리(TanStack Query) + queryKeys 상수화
├─ routes/       # 화면 라우팅(TanStack Router)
├─ components/   # 공통 UI(PageHeader, StatusBadge, Error/Empty 등)
└─ lib/          # queryClient / utils 등 공통 유틸
```

### 데이터 흐름

```txt
routes(페이지 UI)
  └─ queries(useQuery)  ← 캐싱/재시도/로딩상태/데이터가공(select)
        └─ api(fetch*)  ← 현재는 mock 반환
```

실제 API가 준비되면 `src/api/**`의 `fetch*()`만 네트워크 호출로 교체하면 됩니다.

---

## 기술 스택 & 선택 이유(비교군 포함)

### 핵심 의존성

- React 19, TypeScript 5, Vite 7
- TanStack Router / TanStack Query
- shadcn/ui(Radix UI 기반) + Tailwind CSS 4
- Recharts
- Zustand
- Vitest + Testing Library

### 1) Vite (vs Next.js / CRA)

- 운영 콘솔은 보통 CSR 중심이며, 빠른 개발/빌드/리프레시가 중요합니다.
- Vite는 개발 서버 체감 속도와 설정 단순성이 좋아 **프로토타이핑 → 구조화** 흐름이 빠릅니다.
- Next.js는 SSR/서버 기능이 강력하지만, 이 프로젝트 목표는 “운영 콘솔 UI/상태 관리”이므로 Vite가 적합합니다.

### 2) TanStack Router (vs React Router)

- 타입 안전성 + 파일 기반 라우트 정리로, 페이지가 빠르게 늘어나는 운영 콘솔에 유리합니다.
- Router Devtools로 라우팅 디버깅이 편합니다.

### 3) TanStack Query (vs SWR / Redux Toolkit Query)

- 서버 상태(Server State)를 “전역 상태”와 분리해 다루는 정석입니다.
- 운영 콘솔은 데이터가 많고, 캐싱/재시도/백그라운드 갱신/지표 화면이 빈번합니다.

이 프로젝트에서 반영한 실무 포인트:

- `queryKeys` 상수화 → 오타 방지 + invalidate 시 자동완성
- 데이터 성격에 맞춘 `staleTime`, `retry` 정책
- `select`로 데이터 가공을 Query 계층에서 처리 → UI 단순화
- Loading/Error/Empty UI를 공통 컴포넌트로 표준화
- mock API를 queryFn에서 반환 → 실제 API 연결 시 UI 변경 최소화

### 4) shadcn/ui + Radix (vs MUI/Chakra)

- 디자인 시스템을 “코드로 소유”할 수 있어, 회사/프로덕트 스타일에 맞춘 커스터마이징이 쉽습니다.
- 필요한 컴포넌트만 추가해 사용하므로 번들/스타일 오버라이드 비용이 낮습니다.

### 5) Tailwind CSS (vs styled-components / CSS Modules)

- 운영 콘솔은 카드/테이블/상태 UI가 반복되므로 클래스 기반 조합이 빠르고 일관성 유지가 쉽습니다.
- 반응형/다크모드/상태 스타일을 한 자리에서 관리하기 좋습니다.

### 6) Recharts (vs Chart.js)

- React 컴포넌트 조합 방식이라 운영 지표/추세 차트 커스터마이징이 편합니다.

### 7) pnpm (vs npm/yarn)

- 설치 속도/캐시 효율이 좋고, 향후 모노레포(워크스페이스) 확장에도 유리합니다.

---

## 코드 레벨 실무 고려사항

- **서버 상태는 TanStack Query로 일원화**, Zustand는 UI 상태 같은 “클라이언트 상태”에만 사용
- API 없는 상태에서도 구조를 먼저 잡기 위해 **mock을 api 계층에서 반환**
- 페이지별 UX 편차를 줄이기 위해 **PageHeader / StatusBadge / ErrorState / EmptyState** 공통화
- 로딩 중에는 shadcn/ui의 `Skeleton`으로 “운영 콘솔스러운” 대기 UX 제공
- QueryClient 기본 옵션으로 불필요한 리패칭을 줄이고(필요 시 정책 조정), invalidate/refetch 시나리오 확장 가능

---

## 실행 방법(클론 후 바로 실행)

### 요구 사항

- Node.js 20+ (권장: 22)
- pnpm

### 설치 & 실행

```bash
git clone https://github.com/mantech-portfolio/mantech-frontweb-demo
cd mantech-frontweb-demo
pnpm install
pnpm dev
```

- 기본 접속: `http://localhost:3000`

### 빌드/프리뷰/테스트

```bash
pnpm build
pnpm preview
pnpm test
```

---

## Scripts (package.json)

- `dev`: `vite --port 3000`
- `build`: `vite build && tsc`
- `preview`: `vite preview`
- `test`: `vitest run`
