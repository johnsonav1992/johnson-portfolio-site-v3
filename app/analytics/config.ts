import type { BrowserWindowLike } from './types.ts'

export const LOGROCKET_APP_ID = '8ho0cs/portfolio-site'
export const LOGROCKET_SCRIPT_SRC = 'https://cdn.lr-in-prod.com/LogRocket.min.js'

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1', '0.0.0.0'])

export const isLocalHostname = (hostname: string): boolean => {
  const normalized = hostname.trim().toLowerCase()

  if (!normalized || LOCAL_HOSTNAMES.has(normalized)) {
    return true
  }

  return normalized.endsWith('.local') || normalized.endsWith('.localhost')
}

export const getBrowserWindow = (): BrowserWindowLike | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window as unknown as BrowserWindowLike
}

export const isProductionBrowser = (
  win: BrowserWindowLike | undefined = getBrowserWindow(),
): boolean => {
  if (!win?.location || !win.document) {
    return false
  }

  if (win.navigator?.webdriver) {
    return false
  }

  const { hostname, protocol } = win.location

  if (protocol !== 'https:' && protocol !== 'http:') {
    return false
  }

  return !isLocalHostname(hostname)
}
