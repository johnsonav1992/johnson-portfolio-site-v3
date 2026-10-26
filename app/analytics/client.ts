import { getBrowserWindow, isProductionBrowser } from './config.ts'
import { createLogRocketProvider } from './logrocket-provider.ts'
import { createNoopAnalyticsProvider } from './noop-provider.ts'
import type {
  AnalyticsClient,
  AnalyticsMetadata,
  AnalyticsProvider,
  BrowserWindowLike,
} from './types.ts'

export interface CreateAnalyticsClientOptions {
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
  options: CreateAnalyticsClientOptions = {},
): AnalyticsProvider => {
  const getWindow = options.getWindow ?? getBrowserWindow
  const enabled = options.enabled ?? isProductionBrowser(getWindow())

  if (!enabled) {
    return createNoopAnalyticsProvider()
  }

  return options.provider ?? createLogRocketProvider({ getWindow })
}

export const createAnalyticsClient = (
  options: CreateAnalyticsClientOptions = {},
): AnalyticsClient => {
  const provider = resolveAnalyticsProvider(options)

  return {
    providerName: provider.name,
    init: async () => {
      try {
        await provider.init()
      } catch {
        return
      }
    },
    identify: (userId: string, traits?: AnalyticsMetadata) => {
      if (!userId.trim()) {
        return
      }

      runSafely(() => {
        provider.identify?.(userId, traits)
      })
    },
    track: (event: string, properties?: AnalyticsMetadata) => {
      if (!event.trim()) {
        return
      }

      runSafely(() => {
        provider.track?.(event, properties)
      })
    },
    captureException: (error: unknown, context?: AnalyticsMetadata) => {
      runSafely(() => {
        provider.captureException?.(error, context)
      })
    },
  }
}

let defaultClient: AnalyticsClient | undefined

export const getAnalyticsClient = (): AnalyticsClient => {
  defaultClient ??= createAnalyticsClient()
  return defaultClient
}

export const initAnalytics = (): Promise<void> => getAnalyticsClient().init()

export const identifyUser = (userId: string, traits?: AnalyticsMetadata): void => {
  getAnalyticsClient().identify(userId, traits)
}

export const trackEvent = (event: string, properties?: AnalyticsMetadata): void => {
  getAnalyticsClient().track(event, properties)
}

export const captureError = (error: unknown, context?: AnalyticsMetadata): void => {
  getAnalyticsClient().captureException(error, context)
}
