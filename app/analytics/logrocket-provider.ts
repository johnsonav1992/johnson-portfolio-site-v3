import { getBrowserWindow, LOGROCKET_APP_ID, LOGROCKET_SCRIPT_SRC } from './config.ts'
import { runSafely } from './safe-execution.ts'
import type {
  AnalyticsMetadata,
  AnalyticsProvider,
  BrowserWindowLike,
  ScriptElementLike,
} from './types.ts'

export interface LogRocketProviderOptions {
  readonly appId?: string
  readonly scriptSrc?: string
  readonly getWindow?: () => BrowserWindowLike | undefined
}

export class LogRocketProvider implements AnalyticsProvider {
  readonly name = 'logrocket'

  private readonly appId: string
  private readonly scriptSrc: string
  private readonly getWindow: () => BrowserWindowLike | undefined
  private initialized = false
  private loadingPromise: Promise<void> | undefined

  constructor(options: LogRocketProviderOptions = {}) {
    this.appId = options.appId ?? LOGROCKET_APP_ID
    this.scriptSrc = options.scriptSrc ?? LOGROCKET_SCRIPT_SRC
    this.getWindow = options.getWindow ?? getBrowserWindow
  }

  init = async (): Promise<void> => {
    const win = this.getWindow()
    if (!win) {
      return
    }

    await this.loadSdkScript(win)
  }

  identify = (userId: string, traits?: AnalyticsMetadata): void => {
    runSafely(() => {
      this.getWindow()?.LogRocket?.identify?.(userId, traits)
    })
  }

  track = (event: string, properties?: AnalyticsMetadata): void => {
    runSafely(() => {
      this.getWindow()?.LogRocket?.track?.(event, properties)
    })
  }

  captureException = (error: unknown, context?: AnalyticsMetadata): void => {
    runSafely(() => {
      this.getWindow()?.LogRocket?.captureException?.(error, context)
    })
  }

  private initializeSdk = (win: BrowserWindowLike): void => {
    if (this.initialized || !win.LogRocket) {
      return
    }

    runSafely(() => {
      win.LogRocket?.init(this.appId)
      this.initialized = true
    })
  }

  private bindScriptEvents = (
    script: ScriptElementLike,
    win: BrowserWindowLike,
    resolve: () => void,
  ): void => {
    const previousOnLoad = script.onload
    const previousOnError = script.onerror

    script.onload = () => {
      runSafely(() => {
        previousOnLoad?.()
      })
      this.loadingPromise = undefined
      this.initializeSdk(win)
      resolve()
    }

    script.onerror = () => {
      runSafely(() => {
        previousOnError?.()
      })
      this.loadingPromise = undefined
      resolve()
    }
  }

  private loadSdkScript = (win: BrowserWindowLike): Promise<void> => {
    if (win.LogRocket) {
      this.initializeSdk(win)
      return Promise.resolve()
    }

    if (this.loadingPromise) {
      return this.loadingPromise
    }

    const doc = win.document
    if (!doc?.head) {
      return Promise.resolve()
    }

    const existingScript = doc.querySelector(`script[src="${this.scriptSrc}"]`)
    if (existingScript) {
      this.loadingPromise = new Promise<void>((resolve) => {
        runSafely(() => {
          this.bindScriptEvents(existingScript, win, resolve)
        })
      })

      return this.loadingPromise
    }

    this.loadingPromise = new Promise<void>((resolve) => {
      runSafely(() => {
        const script = doc.createElement('script')
        script.async = true
        script.src = this.scriptSrc
        script.setAttribute?.('data-analytics-provider', 'logrocket')
        this.bindScriptEvents(script, win, resolve)
        doc.head?.appendChild(script)
      })
    })

    return this.loadingPromise
  }
}
