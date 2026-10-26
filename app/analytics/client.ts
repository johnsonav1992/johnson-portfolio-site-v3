import { getBrowserWindow, isProductionBrowser } from './config.ts'
import { LogRocketProvider } from './logrocket-provider.ts'
import { NoopAnalyticsProvider } from './noop-provider.ts'
import type {
  AnalyticsClient,
  AnalyticsMetadata,
  AnalyticsProvider,
  BrowserWindowLike,
} from './types.ts'

export interface AnalyticsServiceOptions {
  readonly enabled?: boolean
  readonly provider?: AnalyticsProvider
  readonly getWindow?: () => BrowserWindowLike | undefined
}

const runSafely = (operation: () => void): void => {
  try {
    operation()
  } catch {
    return
  }
}

export const resolveAnalyticsProvider = (
  options: AnalyticsServiceOptions = {},
): AnalyticsProvider => {
  const getWindow = options.getWindow ?? getBrowserWindow
  const enabled = options.enabled ?? isProductionBrowser(getWindow())

  if (!enabled) {
    return new NoopAnalyticsProvider()
  }

  return options.provider ?? new LogRocketProvider({ getWindow })
}

export class AnalyticsService implements AnalyticsClient {
  readonly providerName: string

  private readonly provider: AnalyticsProvider

  constructor(options: AnalyticsServiceOptions = {}) {
    this.provider = resolveAnalyticsProvider(options)
    this.providerName = this.provider.name
  }

  init = async (): Promise<void> => {
    try {
      await this.provider.init()
    } catch {
      return
    }
  }

  identify = (userId: string, traits?: AnalyticsMetadata): void => {
    if (!userId.trim()) {
      return
    }

    runSafely(() => {
      this.provider.identify?.(userId, traits)
    })
  }

  track = (event: string, properties?: AnalyticsMetadata): void => {
    if (!event.trim()) {
      return
    }

    runSafely(() => {
      this.provider.track?.(event, properties)
    })
  }

  captureException = (error: unknown, context?: AnalyticsMetadata): void => {
    runSafely(() => {
      this.provider.captureException?.(error, context)
    })
  }
}

let defaultService: AnalyticsService | undefined

export const getAnalyticsService = (): AnalyticsService => {
  defaultService ??= new AnalyticsService()
  return defaultService
}

export const initAnalytics = (): Promise<void> => getAnalyticsService().init()

export const identifyUser = (userId: string, traits?: AnalyticsMetadata): void => {
  getAnalyticsService().identify(userId, traits)
}

export const trackEvent = (event: string, properties?: AnalyticsMetadata): void => {
  getAnalyticsService().track(event, properties)
}

export const captureError = (error: unknown, context?: AnalyticsMetadata): void => {
  getAnalyticsService().captureException(error, context)
}
