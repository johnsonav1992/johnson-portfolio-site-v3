import { getBrowserWindow, LOGROCKET_APP_ID, LOGROCKET_SCRIPT_SRC } from './config.ts'
import type { AnalyticsMetadata, AnalyticsProvider, BrowserWindowLike } from './types.ts'

export interface LogRocketProviderOptions {
  readonly appId?: string
  readonly scriptSrc?: string
  readonly getWindow?: () => BrowserWindowLike | undefined
}

const runSafely = (operation: () => void): void => {
  try {
    operation()
  } catch {
    return
  }
}

export const createLogRocketProvider = (
  options: LogRocketProviderOptions = {},
): AnalyticsProvider => {
  const appId = options.appId ?? LOGROCKET_APP_ID
  const scriptSrc = options.scriptSrc ?? LOGROCKET_SCRIPT_SRC
  const getWindow = options.getWindow ?? getBrowserWindow

  let initialized = false
  let loadingPromise: Promise<void> | undefined

  const initializeSdk = (win: BrowserWindowLike): void => {
    if (initialized || !win.LogRocket) {
      return
    }

    runSafely(() => {
      win.LogRocket?.init(appId)
      initialized = true
    })
  }

  const loadSdkScript = (win: BrowserWindowLike): Promise<void> => {
    if (win.LogRocket) {
      initializeSdk(win)
      return Promise.resolve()
    }

    const doc = win.document
    if (!doc?.head) {
      return Promise.resolve()
    }

    const existingScript = doc.querySelector(`script[src="${scriptSrc}"]`)
    if (existingScript) {
      initializeSdk(win)
      return Promise.resolve()
    }

    if (loadingPromise) {
      return loadingPromise
    }

    loadingPromise = new Promise<void>((resolve) => {
      runSafely(() => {
        const script = doc.createElement('script')
        script.async = true
        script.src = scriptSrc
        script.setAttribute?.('data-analytics-provider', 'logrocket')

        script.onload = () => {
          initializeSdk(win)
          resolve()
        }

        script.onerror = () => {
          loadingPromise = undefined
          resolve()
        }

        doc.head?.appendChild(script)
      })
    })

    return loadingPromise
  }

  return {
    name: 'logrocket',
    init: async () => {
      const win = getWindow()
      if (!win) {
        return
      }

      await loadSdkScript(win)
    },
    identify: (userId: string, traits?: AnalyticsMetadata) => {
      runSafely(() => {
        getWindow()?.LogRocket?.identify?.(userId, traits)
      })
    },
    track: (event: string, properties?: AnalyticsMetadata) => {
      runSafely(() => {
        getWindow()?.LogRocket?.track?.(event, properties)
      })
    },
    captureException: (error: unknown, context?: AnalyticsMetadata) => {
      runSafely(() => {
        getWindow()?.LogRocket?.captureException?.(error, context)
      })
    },
  }
}
