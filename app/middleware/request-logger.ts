import type { Middleware } from 'remix/fetch-router'
import { logger } from 'remix/logger-middleware'

const LOGGER_DELIMITER = '\t'
const LOGGER_FORMAT = [
  '%dateISO',
  '%method',
  '%path',
  '%status',
  '%duration',
  '%contentLength',
  '%contentType',
  '%referer',
  '%userAgent',
].join(LOGGER_DELIMITER)

const skippedSuccessfulPathPrefixes = ['/assets/', '/media/']
const skippedSuccessfulPaths = ['/favicon.ico']

const shouldLogRequest = ({
  method,
  path,
  status,
}: {
  method: string
  path: string
  status: number
}) => {
  if (method !== 'GET' && method !== 'HEAD') {
    return true
  }

  if (status >= 400) {
    return true
  }

  const pathname = path.split('?')[0] ?? path

  if (skippedSuccessfulPaths.includes(pathname)) {
    return false
  }

  return !skippedSuccessfulPathPrefixes.some((prefix) => pathname.startsWith(prefix))
}

const logLine = (line: string, level: 'error' | 'info' | 'warn') => {
  if (level === 'error') {
    console.error(line)
  } else if (level === 'warn') {
    console.warn(line)
  } else {
    console.log(line)
  }
}

export const requestLogger = (): Middleware => {
  const accessLogger = logger({
    colors: false,
    format: LOGGER_FORMAT,
    log(message) {
      const [
        date,
        method,
        path,
        statusValue,
        duration,
        contentLength,
        contentType,
        referer,
        userAgent,
      ] = message.split(LOGGER_DELIMITER)
      const status = Number(statusValue)

      if (!shouldLogRequest({ method, path, status })) {
        return
      }

      const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info'
      const normalizedContentLength = contentLength === '-' ? 'stream' : contentLength
      const normalizedReferer = referer === '-' ? 'direct' : referer
      const line = [
        `[${date}]`,
        level.toUpperCase(),
        method,
        path,
        statusValue,
        `${duration}ms`,
        normalizedContentLength,
        contentType,
        `referer=${normalizedReferer}`,
        `ua="${userAgent}"`,
      ].join(' ')

      logLine(line, level)
    },
  })

  return async (context, next) => {
    const start = Date.now()

    try {
      return await accessLogger(context, next)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error
      }

      const duration = Date.now() - start
      const message = error instanceof Error ? error.message : String(error)
      const line = [
        `[${new Date(start).toISOString()}]`,
        'ERROR',
        context.method,
        context.url.pathname + context.url.search,
        'thrown',
        `${duration}ms`,
        `error="${message}"`,
      ].join(' ')

      logLine(line, 'error')
      throw error
    }
  }
}
