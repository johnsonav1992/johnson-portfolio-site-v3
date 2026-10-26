import * as assert from 'remix/assert'
import { describe, it } from 'remix/test'

import {
  type AnalyticsMetadata,
  type AnalyticsProvider,
  AnalyticsService,
  type BrowserWindowLike,
  isLocalHostname,
  isProductionBrowser,
  LOGROCKET_APP_ID,
  LOGROCKET_SCRIPT_SRC,
  LogRocketProvider,
  NoopAnalyticsProvider,
  resolveAnalyticsProvider,
  type ScriptElementLike,
} from '../../app/analytics/index.ts'

interface FakeDomHarness {
  readonly scripts: ScriptElementLike[]
  readonly initCalls: string[]
  readonly identifyCalls: Array<{ userId: string; traits?: AnalyticsMetadata }>
  readonly trackCalls: Array<{ event: string; properties?: AnalyticsMetadata }>
  readonly exceptionCalls: Array<{ error: unknown; context?: AnalyticsMetadata }>
  readonly win: BrowserWindowLike
}

const createFakeDomHarness = (
  overrides: {
    hostname?: string
    protocol?: string
    webdriver?: boolean
    preloadedSdk?: boolean
  } = {},
): FakeDomHarness => {
  const scripts: ScriptElementLike[] = []
  const initCalls: string[] = []
  const identifyCalls: Array<{ userId: string; traits?: AnalyticsMetadata }> = []
  const trackCalls: Array<{ event: string; properties?: AnalyticsMetadata }> = []
  const exceptionCalls: Array<{ error: unknown; context?: AnalyticsMetadata }> = []

  const sdk = {
    init: (appId: string) => {
      initCalls.push(appId)
    },
    identify: (userId: string, traits?: AnalyticsMetadata) => {
      identifyCalls.push({ userId, traits })
    },
    track: (event: string, properties?: AnalyticsMetadata) => {
      trackCalls.push({ event, properties })
    },
    captureException: (error: unknown, context?: AnalyticsMetadata) => {
      exceptionCalls.push({ error, context })
    },
  }

  const win: BrowserWindowLike = {
    location: {
      hostname: overrides.hostname ?? 'alexjohnson.io',
      protocol: overrides.protocol ?? 'https:',
    },
    navigator: {
      webdriver: overrides.webdriver ?? false,
    },
    document: {
      head: {
        appendChild: (node: ScriptElementLike) => {
          scripts.push(node)
          return node
        },
      },
      createElement: () => {
        const attributes = new Map<string, string>()

        return {
          async: false,
          src: '',
          onload: null,
          onerror: null,
          getAttribute: (name: string) => attributes.get(name) ?? null,
          setAttribute: (name: string, value: string) => {
            attributes.set(name, value)
          },
        }
      },
      querySelector: (selector: string) =>
        scripts.find((script) => selector.includes(script.src)) ?? null,
    },
    ...(overrides.preloadedSdk ? { LogRocket: sdk } : {}),
  }

  return {
    scripts,
    initCalls,
    identifyCalls,
    trackCalls,
    exceptionCalls,
    win,
  }
}

describe('analytics environment gating', () => {
  it('identifies local and development hostnames', () => {
    assert.equal(isLocalHostname('localhost'), true)
    assert.equal(isLocalHostname('127.0.0.1'), true)
    assert.equal(isLocalHostname('[::1]'), true)
    assert.equal(isLocalHostname('dev.local'), true)
    assert.equal(isLocalHostname('preview.localhost'), true)
    assert.equal(isLocalHostname(''), true)
    assert.equal(isLocalHostname('alexjohnson.io'), false)
  })

  it('enables analytics only in non-automated production browsers', () => {
    assert.equal(isProductionBrowser(undefined), false)
    assert.equal(isProductionBrowser({}), false)
    assert.equal(isProductionBrowser(createFakeDomHarness({ hostname: 'localhost' }).win), false)
    assert.equal(isProductionBrowser(createFakeDomHarness({ hostname: '127.0.0.1' }).win), false)
    assert.equal(isProductionBrowser(createFakeDomHarness({ webdriver: true }).win), false)
    assert.equal(isProductionBrowser(createFakeDomHarness({ protocol: 'file:' }).win), false)
    assert.equal(
      isProductionBrowser(createFakeDomHarness({ hostname: 'alexjohnson.io' }).win),
      true,
    )
  })
})

describe('AnalyticsService', () => {
  it('falls back to NoopAnalyticsProvider when disabled or on localhost', async () => {
    const localHarness = createFakeDomHarness({ hostname: 'localhost' })
    const provider = resolveAnalyticsProvider({ getWindow: () => localHarness.win })
    const service = new AnalyticsService({ getWindow: () => localHarness.win })

    await service.init()
    service.identify('user-1')
    service.track('page_view')
    service.captureException(new Error('test'))

    assert.equal(provider instanceof NoopAnalyticsProvider, true)
    assert.equal(provider.name, 'noop')
    assert.equal(service.providerName, 'noop')
    assert.equal(localHarness.scripts.length, 0)
  })

  it('delegates calls to a custom AnalyticsProvider and isolates provider errors', async () => {
    const events: string[] = []

    class CustomTelemetryProvider implements AnalyticsProvider {
      readonly name = 'custom-telemetry'

      init = (): void => {
        events.push('init')
      }

      identify = (userId: string): void => {
        events.push(`identify:${userId}`)
      }

      track = (event: string): void => {
        events.push(`track:${event}`)
      }

      captureException = (): void => {
        throw new Error('provider failure')
      }
    }

    const service = new AnalyticsService({
      enabled: true,
      provider: new CustomTelemetryProvider(),
    })

    await service.init()
    service.identify('  ')
    service.identify('alex')
    service.track('  ')
    service.track('project_opened')
    service.captureException(new Error('boom'))

    assert.equal(service.providerName, 'custom-telemetry')
    assert.deepEqual(events, ['init', 'identify:alex', 'track:project_opened'])
  })
})

describe('LogRocketProvider', () => {
  it('loads the LogRocket script once and initializes with the portfolio app ID', async () => {
    const harness = createFakeDomHarness()
    const provider = new LogRocketProvider({ getWindow: () => harness.win })

    const initPromise = provider.init()

    assert.equal(harness.scripts.length, 1)
    assert.equal(harness.scripts[0]?.src, LOGROCKET_SCRIPT_SRC)
    assert.equal(harness.scripts[0]?.async, true)
    assert.equal(harness.scripts[0]?.getAttribute?.('data-analytics-provider'), 'logrocket')

    harness.win.LogRocket = {
      init: (appId: string) => {
        harness.initCalls.push(appId)
      },
      identify: (userId: string, traits?: AnalyticsMetadata) => {
        harness.identifyCalls.push({ userId, traits })
      },
      track: (event: string, properties?: AnalyticsMetadata) => {
        harness.trackCalls.push({ event, properties })
      },
      captureException: (error: unknown, context?: AnalyticsMetadata) => {
        harness.exceptionCalls.push({ error, context })
      },
    }

    harness.scripts[0]?.onload?.()
    await initPromise
    await provider.init()

    provider.identify('alex', { role: 'owner' })
    provider.track('contact_submitted', { method: 'frame' })
    const sampleError = new Error('network timeout')
    provider.captureException(sampleError, { route: '/contact' })

    assert.equal(harness.scripts.length, 1)
    assert.deepEqual(harness.initCalls, [LOGROCKET_APP_ID])
    assert.deepEqual(harness.identifyCalls, [{ userId: 'alex', traits: { role: 'owner' } }])
    assert.deepEqual(harness.trackCalls, [
      { event: 'contact_submitted', properties: { method: 'frame' } },
    ])
    assert.deepEqual(harness.exceptionCalls, [
      { error: sampleError, context: { route: '/contact' } },
    ])
  })

  it('resolves cleanly when the CDN script fails to load', async () => {
    const harness = createFakeDomHarness()
    const provider = new LogRocketProvider({ getWindow: () => harness.win })

    const initPromise = provider.init()
    harness.scripts[0]?.onerror?.()
    await initPromise

    assert.equal(harness.initCalls.length, 0)
  })
})
