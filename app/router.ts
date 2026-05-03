import { createRouter } from 'remix/fetch-router'
import { staticFiles } from 'remix/static-middleware'

import { assets } from './assets.ts'
import { home } from './controllers/home/controller.tsx'
import { tools } from './controllers/tools/controller.tsx'
import { routes } from './routes.ts'

export const router = createRouter({
  middleware: [
    staticFiles('./public', {
      cacheControl: 'public, max-age=3600',
      filter(filePath) {
        return !filePath.split('/').some((segment) => segment.startsWith('.'))
      },
    }),
  ],
})

router.get(routes.assets, async ({ request }) => {
  const response = await assets.fetch(request)
  return response ?? new Response('Not Found', { status: 404 })
})

router.map(routes.home, home)
router.map(routes.tools, tools)
