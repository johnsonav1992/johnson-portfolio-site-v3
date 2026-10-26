export type AnalyticsMetadata = Record<string, unknown>

export interface AnalyticsProvider {
  readonly name: string
  init(): void | Promise<void>
  identify?(userId: string, traits?: AnalyticsMetadata): void
  track?(event: string, properties?: AnalyticsMetadata): void
  captureException?(error: unknown, context?: AnalyticsMetadata): void
}

export interface AnalyticsClient {
  readonly providerName: string
  init(): Promise<void>
  identify(userId: string, traits?: AnalyticsMetadata): void
  track(event: string, properties?: AnalyticsMetadata): void
  captureException(error: unknown, context?: AnalyticsMetadata): void
}

export interface BrowserLocationLike {
  readonly hostname: string
  readonly protocol: string
}

export interface BrowserNavigatorLike {
  readonly webdriver?: boolean
}

export interface ScriptElementLike {
  async: boolean
  src: string
  onload: (() => void) | null
  onerror: (() => void) | null
  getAttribute?(name: string): string | null
  setAttribute?(name: string, value: string): void
}

export interface DocumentLike {
  readonly head?: {
    appendChild(node: ScriptElementLike): unknown
  } | null
  createElement(tagName: 'script'): ScriptElementLike
  querySelector(selector: string): ScriptElementLike | null
}

export interface LogRocketSdk {
  init(appId: string): void
  identify?(userId: string, traits?: AnalyticsMetadata): void
  track?(event: string, properties?: AnalyticsMetadata): void
  captureException?(error: unknown, context?: AnalyticsMetadata): void
}

export interface BrowserWindowLike {
  readonly location?: BrowserLocationLike
  readonly navigator?: BrowserNavigatorLike
  readonly document?: DocumentLike
  LogRocket?: LogRocketSdk
}
