# JavaScript API {#javascript-api}

Vite의 자바스크립트 API들은 전부 타입이 명시되어 있고 intellisense와 유효성 검사를 효과적으로 사용하기 위해 타입 스크립트 또는 VSCode의 JS 타입 검사 활성화를 추천합니다.

## `createServer` {#createserver}

**타입 시그니처:**

```ts
async function createServer(inlineConfig?: InlineConfig): Promise<ViteDevServer>
```

**사용 예제:**

```js
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  const server = await createServer({
    // 유효한 유저 설정 옵션들, 추가적으로 `mode`와 `configFile`가 있습니다.
    configFile: false,
    root: __dirname,
    server: {
      port: 1337
    }
  })
  await server.listen()

  server.printUrls()
})()
```

::: tip 참고
`createServer`와 `build`는 `mode` 설정 옵션과 `process.env.`<wbr>`NODE_ENV`에 의존해 관련 동작을 수행합니다. 따라서 동일한 Node.js 프로세스에서 이 두 함수를 사용하는 경우 충돌이 발생될 수 있으며, 이를 방지하고자 한다면 두 API의 `process.env.`<wbr>`NODE_ENV` 또는 `mode` 설정 옵션을 `development`로 설정하세요. 아니면 하위 프로세스를 만들어 API를 각각 실행하는 방법도 있습니다.
:::

## `InlineConfig` {#inline-config}

`InlineConfig` 인터페이스는 `UserConfig`의 추가적인 속성들로 확장됩니다:

- `configFile`: 특정 설정 파일을 지칭할 때 사용합니다. 만약 설정이 되어있지 않다면, Vite는 자동적으로 프로젝트 루트에서 결정합니다. `false`로 설정한다면 자동 설정을 비활성화합니다.
- `envFile`: `false` 일 때는 `.env` 파일들을 비활성화합니다.

## `ResolvedConfig`

The `ResolvedConfig` interface has all the same properties of a `UserConfig`, except most properties are resolved and non-undefined. It also contains utilities like:

- `config.assetsInclude`: A function to check if an `id` is considered an asset.
- `config.logger`: Vite's internal logger object.

## `ViteDevServer` {#vitedevserver}

```ts
interface ViteDevServer {
  /**
   * 수용된 Vite 설정 객체.
   */
  config: ResolvedConfig
  /**
   * 연결 앱 인스턴스
   * - 개발 서버에 커스텀 미들웨어들을 붙이는데 사용될 수 있습니다.
   * - 커스텀 http 서버 제어 함수로 사용될 수 있습니다.
   *   또는 모든 연결 스타일의 Node.js 프레임워크에서 미들웨어로 사용됩니다.
   *
   * https://github.com/senchalabs/connect#use-middleware
   */
  middlewares: Connect.Server
  /**
   * Native Node http 서버 인스턴스.
   * middleware 모드에서는 null이 됩니다.
   */
  httpServer: http.Server | null
  /**
   * Chokidar watcher 인스턴스.
   * https://github.com/paulmillr/chokidar#api
   */
  watcher: FSWatcher
  /**
   * `send(payload)` 함수가 있는 web socket 서버
   */
  ws: WebSocketServer
  /**
   * 주어진 파일에 플러그인 hooks를 실행할 수 있는 rollup 플러그인 컨테이너
   */
  pluginContainer: PluginContainer
  /**
   * Url로 파일이 맵핑되어 있고 hmr 상태들의 import 관계들을 볼 수 있는 모듈 그래프.
   */
  moduleGraph: ModuleGraph
  /**
   * 프로그래밍 방식으로 URL을 확인, 로드 및 변환하고 http 요청 파이프 라인을 
   * 거치지 않고도 결과를 얻을 수 있습니다.
   */
  transformRequest(
    url: string,
    options?: TransformOptions
  ): Promise<TransformResult | null>
  /**
   * Vite 빌트인 HTML 변환 및 플러그인 HTML 변환을 적용합니다.
   */
  transformIndexHtml(url: string, html: string): Promise<string>
  /**
   * 주어진 URL을 SSR을 위해 인스턴스화 된 모듈로 로드합니다.
   */
  ssrLoadModule(
    url: string,
    options?: { fixStacktrace?: boolean }
  ): Promise<Record<string, any>>
  /**
   * SSR 에러 stacktrace 수정하기
   */
  ssrFixStacktrace(e: Error): void
  /**
   * 서버 시작하기.
   */
  listen(port?: number, isRestart?: boolean): Promise<ViteDevServer>
  /**
   * 서버 재시작하기.
   *
   * @param forceOptimize - optimizer가 re-bundle를 강제시킵니다. --force cli flag를 쓴 것과 똑같습니다.
   */
  restart(forceOptimize?: boolean): Promise<void>
  /**
   * 서버 멈추기.
   */
  close(): Promise<void>
}
```

## `build` {#build}

**타입 시그니처:**

```ts
async function build(
  inlineConfig?: InlineConfig
): Promise<RollupOutput | RollupOutput[]>
```

**사용 예제:**

```js
import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

;(async () => {
  await build({
    root: path.resolve(__dirname, './project'),
    base: '/foo/',
    build: {
      rollupOptions: {
        // ...
      }
    }
  })
})()
```

## `preview` {#preview}

**타입 시그니처:**

```ts
async function preview(inlineConfig?: InlineConfig): Promise<PreviewServer>
```

**사용 예제:**

```js
import { preview } from 'vite'
;(async () => {
  const previewServer = await preview({
    // 유효한 유저 설정 옵션들, 추가적으로 `mode`와 `configFile`가 있습니다.
    preview: {
      port: 8080,
      open: true
    }
  })

  previewServer.printUrls()
})()
```

## `resolveConfig` {#resolveconfig}

**타입 시그니처:**

```ts
async function resolveConfig(
  inlineConfig: InlineConfig,
  command: 'build' | 'serve',
  defaultMode = 'development'
): Promise<ResolvedConfig>
```

개발 단계에서의 `command`의 값은 `serve`입니다 (cli에서는 `vite`, `vite dev`, 그리고 `vite serve`는 전부 별칭입니다).

# `mergeConfig`

**Type Signature:**

```ts
function mergeConfig(
  defaults: Record<string, any>,
  overrides: Record<string, any>,
  isRoot = true
): Record<string, any>
```

Deeply merge two Vite configs. `isRoot` represents the level within the Vite config which is being merged. For example, set `false` if you're merging two `build` options.

## `searchForWorkspaceRoot`

**Type Signature:**

```ts
function searchForWorkspaceRoot(
  current: string,
  root = searchForPackageRoot(current)
): string
```

**Related:** [server.fs.allow](/config/server-options.md#server-fs-allow)

Search for the root of the potential workspace if it meets the following conditions, otherwise it would fallback to `root`:

- contains `workspaces` field in `package.json`
- contains one of the following file
  - `lerna.json`
  - `pnpm-workspace.yaml`

## `loadEnv`

**Type Signature:**

```ts
function loadEnv(
  mode: string,
  envDir: string,
  prefixes: string | string[] = 'VITE_'
): Record<string, string>
```

**Related:** [`.env` Files](./env-and-mode.md#env-files)

Load `.env` files within the `envDir`. By default only env variables prefixed with `VITE_` are loaded, unless `prefixes` is changed.

## `normalizePath`

**Type Signature:**

```ts
function normalizePath(id: string): string
```

**Related:** [Path Normalization](./api-plugin.md#path-normalization)

Normalizes a path to interoperate between Vite plugins.

## `transformWithEsbuild`

**타입 시그니처:**

```ts
async function transformWithEsbuild(
  code: string,
  filename: string,
  options?: EsbuildTransformOptions,
  inMap?: object
): Promise<ESBuildTransformResult>
```

Transform JavaScript or TypeScript with esbuild. Useful for plugins that prefers matching Vite's internal esbuild transform.

## `loadConfigFromFile`

**Type Signature:**

```ts
async function loadConfigFromFile(
  configEnv: ConfigEnv,
  configFile?: string,
  configRoot: string = process.cwd(),
  logLevel?: LogLevel
): Promise<{
  path: string
  config: UserConfig
  dependencies: string[]
} | null>
```

Load a Vite config file manually with esbuild.