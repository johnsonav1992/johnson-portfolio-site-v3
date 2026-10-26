import type { AnalyticsProvider } from './types.ts'

export class NoopAnalyticsProvider implements AnalyticsProvider {
  readonly name = 'noop'

  init = (): void => {}

  identify = (): void => {}

  track = (): void => {}

  captureException = (): void => {}
}
