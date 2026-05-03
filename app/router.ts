import * as path from 'node:path'
import * as fsp from 'node:fs/promises'

import { createRouter } from 'remix/fetch-router'
import { openLazyFile } from 'remix/fs'
import { createFileResponse } from 'remix/response/file'

import { assets } from './assets.ts'
import { home } from './controllers/home.tsx'
import { routes } from './routes.ts'

export const router = createRouter()

router.get(routes.assets, async ({ request }) => {
  let response = await assets.fetch(request)
  return response ?? new Response('Not Found', { status: 404 })
})

router.get(routes.media, async ({ request, params }) => {
  return serveAppAsset(request, params.path)
})

router.get(routes.favicon, async ({ request }) => {
  return serveAppAsset(request, 'favicon.ico')
})

router.map(routes.home, home)
async function serveAppAsset(request: Request, assetPath: string | undefined) {
  if (!assetPath) {
    return new Response('Not Found', { status: 404 })
  }

  let assetRoot = path.resolve(process.cwd(), 'app/assets')
  let filePath = path.resolve(assetRoot, assetPath)

  if (!filePath.startsWith(`${assetRoot}${path.sep}`)) {
    return new Response('Not Found', { status: 404 })
  }

  let stats = await fsp.stat(filePath).catch(() => null)
  if (!stats?.isFile()) {
    return new Response('Not Found', { status: 404 })
  }

  let file = openLazyFile(filePath, { name: path.basename(filePath) })
  return createFileResponse(file, request, {
    cacheControl: 'public, max-age=3600',
  })
}
