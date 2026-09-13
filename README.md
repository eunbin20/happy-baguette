# Happy Bagguete 🥖

다양한 도메인의 사이드 프로젝트를 위한 Nx + npm workspaces 모노레포입니다.
`home`은 Next.js App Router + TypeScript로 구성하며, 정적 export로 배포합니다.

## 시작하기

Node.js 24와 npm 11.11.1을 사용합니다.

```sh
nvm install
nvm use
npm install -g npm@11.11.1
npm ci
npm run dev
```

개발 서버: http://localhost:4200

## 구조

```text
apps/home/
  src/app/layout.tsx    # HTML 언어, 공통 메타데이터, 전역 스타일
  src/app/page.tsx      # 정적으로 생성되는 홈페이지
  next.config.mjs      # output: export
  vitest.config.mts    # React 컴포넌트 테스트
libs/                  # 실제로 재사용하는 UI·유틸리티가 생기면 추가
nx.json                # 작업 의존성, 캐시, 생성기 기본값
```

앱은 다른 앱을 import하지 않고 `type:lib` 태그의 공유 라이브러리를 사용합니다.
Nx Cloud 연결 없이 로컬 캐시를 사용합니다. Next 작업은 앱의 package.json에 명시되어 있습니다.
Vite는 Vitest 테스트 및 이후 독립적인 Vite 앱을 위한 도구로 남겨 두었습니다.

## 명령어

| 명령어                 | 용도                                     |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Next.js 개발 서버, 4200 포트             |
| `npx nx build home`    | home 정적 export                         |
| `npx nx preview home`  | 빌드 후 정적 파일 서버, 4300 포트        |
| `npm run build`        | 전체 앱 빌드                             |
| `npm run lint`         | ESLint 및 Next.js 규칙 검사              |
| `npm run typecheck`    | Next 라우트 타입 생성 후 TypeScript 검사 |
| `npm test`             | Vitest 실행                              |
| `npm run check`        | 린트 → 타입 검사 → 테스트 → 빌드         |
| `npm run format`       | Prettier 적용                            |
| `npm run format:check` | 포맷 검사                                |
| `npm run graph`        | Nx 프로젝트 그래프                       |

## 페이지와 앱 추가

같은 사이트의 도구는 `apps/home/src/app/tools/timer/page.tsx`처럼 추가합니다.
소개·사용법은 정적 페이지에 두고, 입력·계산·상태 변경 부분을 별도 `'use client'` 컴포넌트로 분리합니다.
Client Component도 사전 렌더링되므로 `window`, `localStorage`는 effect 또는 이벤트에서 접근하세요.
페이지별 `metadata`로 제목과 설명을 지정할 수 있습니다.

독립적인 Next 앱과 공유 라이브러리가 필요하면:

```sh
npx nx g @nx/next:app apps/my-site --tags=type:app,scope:my-site
npx nx g @nx/react:lib libs/ui --tags=type:lib,scope:shared
```

새 Next 앱은 정적 export가 기본값이 아닐 수 있으므로 해당 next.config에 `output: 'export'`를 설정합니다.
생성 후 `npx nx show projects`로 이름을 확인하고 `npm run check`를 실행하세요.

## 배포와 SEO

`npx nx build home` 후 **apps/home/out/** 전체를 정적 호스팅에 업로드합니다.
`.next/`는 내부 빌드 파일이고, 기존 Vite 결과인 `dist/apps/home/`는 더 이상 배포 대상이 아닙니다.
Node 서버는 개발·빌드 때만 필요합니다. 미리보기는 `next start` 대신 위 preview 명령을 사용합니다.

- 본문과 제목·설명·Open Graph 메타데이터가 빌드된 HTML에 포함됩니다.
- 실제 배포 도메인이 정해지면 `metadataBase`, 페이지별 canonical, sitemap 및 robots 설정을 추가하세요.
- 기본 설정은 도메인 루트 배포용입니다. GitHub Pages 프로젝트 하위 경로 등에 배포한다면 Next의 `basePath`를 별도로 설정해야 합니다.
- 동적 경로는 `generateStaticParams`로 빌드할 경로를 확정해야 합니다.
- 콘텐츠 변경 시 재빌드·재배포합니다. SSR, ISR, Server Actions 등 요청 시 서버 실행이 필요한 기능은 사용할 수 없습니다.
- 이미지 서버 없이 배포하기 위해 `images.unoptimized`를 설정했습니다.
- 광고 스크립트는 아직 추가하지 않았습니다. 추후 광고 영역의 크기를 확보해 레이아웃 이동을 줄이세요.

참고: [Next.js 정적 export](https://nextjs.org/docs/app/guides/static-exports),
[Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

## 의존성 메모

Nx 간접 의존성 `smol-toml`은 [TOML 파싱 취약점](https://github.com/advisories/GHSA-7w5x-hrqm-74c2)이 수정된 1.7.1로 override했습니다.
Nx가 수정 버전을 직접 사용하게 되면 제거할 수 있습니다.
