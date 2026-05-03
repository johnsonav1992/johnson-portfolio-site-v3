import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { RemixNode } from 'remix/ui'
import { renderToStream } from 'remix/ui/server'

import { assets } from '../assets.ts'
import { router } from '../router.ts'

export const render = (node: RemixNode, request: Request, init?: ResponseInit) => {
  const stream = renderToStream(node, {
    frameSrc: request.url,
    async resolveClientEntry(entryId, component) {
      const [href, exportName = component.name] = entryId.split('#')

      if (!href || !exportName) {
        throw new Error(`Unable to resolve client entry "${entryId}"`)
      }

      if (href.startsWith('file://')) {
        const filePath = fileURLToPath(href)
        const relativePath = path.relative(process.cwd(), filePath).split(path.sep).join('/')

        return {
          href: await assets.getHref(relativePath),
          exportName,
        }
      }

      return { href, exportName }
    },
    async resolveFrame(src, target) {
      const headers = new Headers({ accept: 'text/html' })
      const cookie = request.headers.get('cookie')

      if (cookie) headers.set('cookie', cookie)
      if (target) headers.set('x-remix-target', target)

      const response = await router.fetch(new Request(new URL(src, request.url), { headers }))

      return response.body ?? response.text()
    },
  })

  const headers = new Headers(init?.headers)

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'text/html; charset=utf-8')
  }

  return new Response(stream, { ...init, headers })
}
