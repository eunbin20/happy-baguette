# Happy Bagguete 🥖

다양한 도메인의 사이드 프로젝트를 위한 Nx + npm workspaces 모노레포입니다.
각 웹 앱은 React + TypeScript + Vite로 만들고, 빌드한 정적 파일을 독립적으로 배포합니다.

## 시작하기

Node.js 24와 npm 11.11.1을 사용합니다. nvm을 사용한다면:

```sh
nvm install
nvm use
npm install -g npm@11.11.1
npm ci
npm run dev
```

기본 앱은 http://localhost:4200 에서 열립니다. Node는 개발·빌드에만 필요하며,
배포 시 별도의 API 서버나 Node 서버는 필요하지 않습니다.

## 구조

```text
apps/
  home/                 # 프로젝트 첫 화면, 독립적인 React 웹 앱
libs/                   # 여러 앱에서 실제로 재사용하는 코드가 생기면 추가
nx.json                 # 작업 자동 인식, 캐시, 생성기 기본값
tsconfig.base.json      # 공통 strict TypeScript 설정
eslint.config.mjs       # 공통 린트 및 앱 간 직접 의존 방지
```

앱별 기능은 해당 앱 내부에 둡니다. 여러 앱에서 함께 쓰는 UI나 유틸리티만 `libs/`로 옮깁니다.
앱은 다른 앱을 import하지 않고, `type:lib` 태그를 가진 라이브러리를 통해 공유합니다.
Nx Cloud 연결 없이 로컬 작업 캐시를 사용합니다.

## 명령어

| 명령어                 | 용도                             |
| ---------------------- | -------------------------------- |
| `npm run dev`          | home 개발 서버                   |
| `npx nx dev <앱 이름>` | 특정 앱 개발 서버                |
| `npx nx build home`    | home 정적 빌드                   |
| `npx nx preview home`  | 빌드 결과 로컬 확인              |
| `npm run build`        | 전체 앱 빌드                     |
| `npm run lint`         | ESLint 검사                      |
| `npm run typecheck`    | TypeScript 검사                  |
| `npm test`             | Vitest 실행                      |
| `npm run check`        | 린트 → 타입 검사 → 테스트 → 빌드 |
| `npm run format`       | Prettier 포맷 적용               |
| `npm run format:check` | 포맷 확인                        |
| `npm run graph`        | 프로젝트 의존 관계 확인          |

## 앱과 공유 라이브러리 추가

```sh
npx nx g @nx/react:app apps/timer --tags=type:app,scope:timer
npx nx dev timer

npx nx g @nx/react:lib libs/ui --tags=type:lib,scope:shared
```

React 앱 생성 기본값은 Vite, CSS, ESLint, Vitest입니다. 필요할 때 앱별로 변경할 수 있습니다.
생성 후 `npx nx show projects`로 프로젝트 이름을 확인하고 `npm run check`를 실행하세요.
여러 앱을 동시에 실행할 때는 `npx nx dev timer --port=4201`처럼 포트를 지정합니다.

## 정적 배포

`npx nx build home`의 결과인 `dist/apps/home/` 디렉터리를 정적 호스팅에 업로드하면 됩니다.
다른 앱은 해당 앱의 Vite `build.outDir`를 배포 경로로 사용합니다.
home은 상대 asset 경로(`base: './'`)를 사용하므로 하위 경로에도 올릴 수 있습니다.
HTML을 `file://`로 직접 여는 방식이 아닌 HTTP(S) 정적 호스팅을 사용하세요.
나중에 클라이언트 라우터를 도입한다면 호스팅의 SPA fallback 또는 hash routing도 설정합니다.

참고: [Nx React 생성기](https://nx.dev/docs/technologies/react/generators),
[Nx Vite 플러그인](https://nx.dev/docs/technologies/build-tools/vite/introduction).

## 의존성 메모

Nx의 간접 의존성 `smol-toml`은 [TOML 파싱 취약점](https://github.com/advisories/GHSA-7w5x-hrqm-74c2)이 수정된 1.7.1로 override했습니다. Nx가 수정 버전을 직접 사용하게 되면 이 override를 제거할 수 있습니다.
