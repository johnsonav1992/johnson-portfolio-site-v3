export {
  type CreateAnalyticsClientOptions,
  captureError,
  createAnalyticsClient,
  getAnalyticsClient,
  identifyUser,
  initAnalytics,
  resolveAnalyticsProvider,
  trackEvent,
} from './client.ts'
export {
  getBrowserWindow,
  isLocalHostname,
  isProductionBrowser,
  LOGROCKET_APP_ID,
  LOGROCKET_SCRIPT_SRC,
} from './config.ts'
export {
  createLogRocketProvider,
  type LogRocketProviderOptions,
} from './logrocket-provider.ts'
export {
  createNoopAnalyticsProvider,
  noopAnalyticsProvider,
} from './noop-provider.ts'
export type {
  AnalyticsClient,
  AnalyticsMetadata,
  AnalyticsProvider,
  BrowserLocationLike,
  BrowserNavigatorLike,
  BrowserWindowLike,
  DocumentLike,
  LogRocketSdk,
  ScriptElementLike,
} from './types.ts'
