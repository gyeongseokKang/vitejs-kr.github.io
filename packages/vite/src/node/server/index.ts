import os from 'os'
import fs from 'fs'
import path from 'path'
import * as http from 'http'
import * as https from 'https'
import connect from 'connect'
import corsMiddleware from 'cors'
import chalk from 'chalk'
import { AddressInfo } from 'net'
import chokidar from 'chokidar'
import { resolveConfig, UserConfig, ResolvedConfig } from '../config'
import {
  createPluginContainer,
  PluginContainer
} from '../server/pluginContainer'
import { FSWatcher, WatchOptions } from 'types/chokidar'
import { resolveHttpsConfig } from '../server/https'
import { setupWebSocketServer, WebSocketServer } from '../server/ws'
import { proxyMiddleware, ProxyOptions } from './middlewares/proxy'
import { transformMiddleware } from './middlewares/transform'
import { indexHtmlMiddleware } from './middlewares/indexHtml'
import history from 'connect-history-api-fallback'
import {
  outOfRootStaticMiddleware,
  serveStaticMiddleware
} from './middlewares/static'
import { timeMiddleware } from './middlewares/time'
import { ModuleGraph } from './moduleGraph'
import { Connect } from 'types/connect'
import { createDebugger } from '../utils'
import { errorMiddleware } from './middlewares/error'
import { handleHMRUpdate, HmrOptions } from './hmr'
import { openBrowser } from './openBrowser'
import launchEditorMiddleware from 'launch-editor-middleware'
import { TransformResult } from 'rollup'
import { transformRequest } from './transformRequest'
import {
  transformWithEsbuild,
  EsbuildTransformResult
} from '../plugins/esbuild'
import { TransformOptions as EsbuildTransformOptions } from 'esbuild'

export interface ServerOptions {
  host?: string
  port?: number
  /**
   * Enable TLS + HTTP/2.
   * Note: this downgrades to TLS only when the proxy option is also used.
   */
  https?: boolean | https.ServerOptions
  /**
   * Open browser window on startup
   */
  open?: boolean
  /**
   * Force dep pre-optimization regardless of whether deps have changed.
   */
  force?: boolean
  /**
   * Configure HMR-specific options (port, host, path & protocol)
   */
  hmr?: HmrOptions | boolean
  /**
   * chokidar watch options
   * https://github.com/paulmillr/chokidar#api
   */
  watch?: WatchOptions
  /**
   * Configure custom proxy rules for the dev server. Expects an object
   * of `{ key: options }` pairs.
   * Uses [`http-proxy`](https://github.com/http-party/node-http-proxy).
   * Full options [here](https://github.com/http-party/node-http-proxy#options).
   *
   * Example `vite.config.js`:
   * ``` js
   * module.exports = {
   *   proxy: {
   *     // string shorthand
   *     '/foo': 'http://localhost:4567/foo',
   *     // with options
   *     '/api': {
   *       target: 'http://jsonplaceholder.typicode.com',
   *       changeOrigin: true,
   *       rewrite: path => path.replace(/^\/api/, '')
   *     }
   *   }
   * }
   * ```
   */
  proxy?: Record<string, string | ProxyOptions>
  /**
   * Configure CORS for the dev server.
   * Uses https://github.com/expressjs/cors.
   * Set to `true` to allow all methods from any origin, or configure separately
   * using an object.
   */
  cors?: CorsOptions | boolean
}

/**
 * https://github.com/expressjs/cors#configuration-options
 */
export interface CorsOptions {
  origin?:
    | CorsOrigin
    | ((origin: string, cb: (err: Error, origins: CorsOrigin) => void) => void)
  methods?: string | string[]
  allowedHeaders?: string | string[]
  exposedHeaders?: string | string[]
  credentials?: boolean
  maxAge?: number
  preflightContinue?: boolean
  optionsSuccessStatus?: number
}

export type CorsOrigin = boolean | string | RegExp | (string | RegExp)[]

export type ServerHook = (
  server: ViteDevServer
) => (() => void) | void | Promise<(() => void) | void>

export interface ViteDevServer {
  /**
   * The resolved vite config object
   */
  config: ResolvedConfig
  /**
   * connect app instance
   * This can also be used as the handler function of a custom http server
   * https://github.com/senchalabs/connect#use-middleware
   */
  app: Connect.Server
  /**
   * native Node http server instance
   */
  httpServer: http.Server
  /**
   * chokidar watcher instance
   * https://github.com/paulmillr/chokidar#api
   */
  watcher: FSWatcher
  /**
   * web socket server with `send(payload)` method
   */
  ws: WebSocketServer
  /**
   * Rollup plugin container that can run plugin hooks on a given file
   */
  container: PluginContainer
  /**
   * Module graph that tracks the import relationships, url to file mapping
   * and hmr state.
   */
  moduleGraph: ModuleGraph
  /**
   * Programatically resolve, load and transform a URL and get the result
   * without going through the http request pipeline.
   */
  transformRequest(url: string): Promise<TransformResult | null>
  /**
   * Util for transfoming a file with esbuild.
   * Can be useful for certain plugins.
   */
  transformWithEsbuild(
    code: string,
    filename: string,
    options?: EsbuildTransformOptions,
    inMap?: object
  ): Promise<EsbuildTransformResult>
}

export async function createServer(
  inlineConfig: UserConfig = {},
  mode = 'development',
  configPath?: string | false
): Promise<ViteDevServer> {
  const resolvedConfig = await resolveConfig(
    inlineConfig,
    'serve',
    mode,
    configPath
  )

  const root = resolvedConfig.root
  const serverConfig = resolvedConfig.server || {}

  const app = connect() as Connect.Server
  const httpServer = await resolveHttpServer(serverConfig, app)
  const ws = setupWebSocketServer(httpServer)

  const watchOptions = serverConfig.watch || {}
  const watcher = chokidar.watch(root, {
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      ...(watchOptions.ignored || [])
    ],
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ...watchOptions
  }) as FSWatcher

  const plugins = resolvedConfig.plugins
  const container = await createPluginContainer(plugins, {}, root, watcher)
  const moduleGraph = new ModuleGraph(container)

  const server: ViteDevServer = {
    config: resolvedConfig,
    app,
    httpServer,
    watcher,
    container,
    ws,
    moduleGraph,
    transformRequest(url) {
      return transformRequest(url, server)
    },
    transformWithEsbuild
  }

  if (serverConfig.hmr !== false) {
    watcher.on('change', (file) => {
      // invalidate module graph cache on file change
      moduleGraph.onFileChange(file)
      handleHMRUpdate(file, server)
    })
  }

  // apply server configuration hooks from plugins
  const postHooks: ((() => void) | void)[] = []
  for (const plugin of plugins) {
    const hook = plugin.configureServer
    hook && postHooks.push(await hook(server))
  }

  // Internal middlewares
  const { cors, proxy } = serverConfig

  if (process.env.DEBUG) {
    app.use(timeMiddleware(root))
  }

  // cors (enabled by default)
  if (cors !== false) {
    app.use(corsMiddleware(typeof cors === 'boolean' ? {} : cors))
  }

  // proxy
  if (proxy) {
    app.use(proxyMiddleware(server))
  }

  // open in editor support
  app.use('/__open-in-editor', launchEditorMiddleware())

  // main transform middleware
  app.use(transformMiddleware(server))

  // serve static files
  app.use(outOfRootStaticMiddleware())
  app.use(serveStaticMiddleware(root))
  app.use(serveStaticMiddleware(path.join(root, 'public')))

  // spa fallback
  app.use(history({ logger: createDebugger('vite:spa-fallback') }))

  // run post config hooks
  // This is applied before the html middleware so that user middleware can
  // serve custom content instead of index.html.
  postHooks.forEach((fn) => fn && fn())

  // transform index.html
  app.use(indexHtmlMiddleware(server, plugins))

  // handle 404s
  app.use((_, res) => {
    res.statusCode = 404
    res.end()
  })

  // error handler
  app.use(errorMiddleware(server))

  // overwrite listen to run optimizer before server start
  const listen = httpServer.listen.bind(httpServer)
  httpServer.listen = (async (port: number, ...args: any[]) => {
    await container.buildStart({})
    // TODO run optimizer
    return listen(port, ...args)
  }) as any

  httpServer.once('listening', () => {
    // update actual port since this may be different from initial value
    serverConfig.port = (httpServer.address() as AddressInfo).port
  })

  return server
}

async function resolveHttpServer(
  { https = false, proxy }: ServerOptions,
  app: Connect.Server
): Promise<http.Server> {
  if (!https) {
    return require('http').createServer(app)
  }

  const httpsOptions = await resolveHttpsConfig(
    typeof https === 'boolean' ? {} : https
  )
  if (proxy) {
    // #484 fallback to http1 when proxy is needed.
    return require('https').createServer(httpsOptions, app)
  } else {
    return require('http2').createSecureServer(
      {
        ...httpsOptions,
        allowHTTP1: true
      },
      app
    )
  }
}

export async function startServer(
  inlineConfig: UserConfig = {},
  mode = 'development',
  configPath?: string | false
): Promise<ViteDevServer> {
  const server = await createServer(inlineConfig, mode, configPath)

  const options = server.config.server || {}
  let port = options.port || 3000
  let hostname = options.host || 'localhost'
  const protocol = options.https ? 'https' : 'http'
  const httpServer = server.httpServer

  return new Promise((resolve, reject) => {
    httpServer.on('error', (e: Error & { code?: string }) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying another one...`)
        setTimeout(() => {
          httpServer.close()
          httpServer.listen(++port)
        }, 100)
      } else {
        reject(e)
      }
    })

    httpServer.listen(port, () => {
      console.log()
      console.log(`  Dev server running at:`)
      console.log()
      const interfaces = os.networkInterfaces()
      Object.keys(interfaces).forEach((key) =>
        (interfaces[key] || [])
          .filter((details) => details.family === 'IPv4')
          .map((detail) => {
            return {
              type: detail.address.includes('127.0.0.1')
                ? 'Local:   '
                : 'Network: ',
              host: detail.address.replace('127.0.0.1', hostname)
            }
          })
          .forEach(({ type, host }) => {
            const url = `${protocol}://${host}:${chalk.bold(port)}/`
            console.log(`  > ${type} ${chalk.cyan(url)}`)
          })
      )

      console.log()
      console.log(
        // @ts-ignore
        chalk.cyan(`  ready in ${Date.now() - global.__vite_start_time}ms.`)
      )
      console.log()

      // @ts-ignore
      const profileSession = global.__vite_profile_session
      if (profileSession) {
        profileSession.post('Profiler.stop', (err: any, { profile }: any) => {
          // Write profile to disk, upload, etc.
          if (!err) {
            const outPath = path.resolve('./vite-profile.cpuprofile')
            fs.writeFileSync(outPath, JSON.stringify(profile))
            console.log(
              chalk.yellow(
                `  CPU profile written to ${chalk.white.dim(outPath)}`
              )
            )
            console.log()
          } else {
            throw err
          }
        })
      }

      if (options.open) {
        openBrowser(`${protocol}://${hostname}:${port}`, options.open)
      }

      resolve(server)
    })
  })
}
