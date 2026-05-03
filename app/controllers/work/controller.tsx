import type { Controller } from 'remix/fetch-router'

import { projects } from '../../data/work.ts'
import type { routes } from '../../routes.ts'
import { render } from '../../utils/render.tsx'
import { ProjectDetailPage } from './project-detail/page.tsx'
import { WorkIndexPage } from './work-index/page.tsx'

export const work = {
  actions: {
    index({ request }) {
      return render(<WorkIndexPage />, request)
    },
    show({ params, request }) {
      const project = projects.find((item) => item.route === params.projectRoute)

      if (!project) {
        return new Response('Not Found', { status: 404 })
      }

      return render(<ProjectDetailPage project={project} />, request)
    },
  },
} satisfies Controller<typeof routes.work>
