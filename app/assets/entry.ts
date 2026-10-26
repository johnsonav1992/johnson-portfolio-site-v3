import { run } from 'remix/component'

run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
  async resolveFrame(src, { signal, target, method, formData } = {}) {
    let headers = new Headers({ accept: 'text/html' })
    if (target) headers.set('x-remix-target', target)

    let response = await fetch(src, {
      credentials: 'same-origin',
      headers,
      signal,
      method,
      body: method && method !== 'GET' ? formData : undefined,
    })
    return response
  },
})
