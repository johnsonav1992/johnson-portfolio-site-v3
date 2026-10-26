import { run } from 'remix/component'

import { initAnalytics } from '../analytics/index.ts'

void initAnalytics()

run({
  async loadModule(moduleUrl, exportName) {
    const mod = await import(moduleUrl)
    return mod[exportName]
  },
  async resolveFrame(src, { signal, target, method, formData } = {}) {
    const headers = new Headers({ accept: 'text/html' })
    if (target) headers.set('x-remix-target', target)

    const response = await fetch(src, {
      credentials: 'same-origin',
      headers,
      signal,
      method,
      body: method && method !== 'GET' ? formData : undefined,
    })
    return response
  },
})
