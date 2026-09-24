import { formData } from 'remix/middleware/form-data'
import { staticFiles } from 'remix/middleware/static'
import { createRouter } from 'remix/router'

import { assets } from './assets.ts'
import { contact } from './controllers/contact/controller.tsx'
import { home } from './controllers/home/controller.tsx'
import { renderNotFound } from './controllers/not-found/controller.tsx'
import { projects } from './controllers/projects/controller.tsx'
import { tools } from './controllers/tools/controller.tsx'
import { requestLogger } from './middleware/request-logger.ts'
import { routes } from './routes.ts'
import { publicStaticCache } from './utils/cache.ts'

export const router = createRouter({
  defaultHandler({ request }) {
    return renderNotFound(request)
  },
  middleware: [
    staticFiles('./public', {
      cacheControl: publicStaticCache,
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
router.map(routes.projects, projects)
