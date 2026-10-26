import type { AnalyticsProvider } from './types.ts'

export const noopAnalyticsProvider: AnalyticsProvider = {
  name: 'noop',
  init: () => {},
  identify: () => {},
  track: () => {},
  captureException: () => {},
}

export const createNoopAnalyticsProvider = (): AnalyticsProvider => noopAnalyticsProvider
