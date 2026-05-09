import { createRouter } from 'remix/fetch-router'
import { formData } from 'remix/form-data-middleware'
import { staticFiles } from 'remix/static-middleware'

import { assets } from './assets.ts'
import { contact } from './controllers/contact/controller.tsx'
import { home } from './controllers/home/controller.tsx'
import { tools } from './controllers/tools/controller.tsx'
import { work } from './controllers/work/controller.tsx'
import { requestLogger } from './middleware/request-logger.ts'
import { routes } from './routes.ts'

export const router = createRouter({
  middleware: [
    staticFiles('./public', {
      cacheControl: 'public, max-age=3600',
      filter(filePath) {
        return !filePath.split('/').some((segment) => segment.startsWith('.'))
      },
    }),
    requestLogger(),
    formData(),
  ],
})

router.get(routes.assets, async ({ request }) => {
  const response = await assets.fetch(request)
  return response ?? new Response('Not Found', { status: 404 })
})

router.map(routes.home, home)
router.map(routes.contact, contact)
router.map(routes.tools, tools)
router.map(routes.work, work)
