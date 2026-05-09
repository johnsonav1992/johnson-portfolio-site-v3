import type { Controller } from 'remix/fetch-router'

import { projects as projectItems } from '../../data/projects.ts'
import type { routes } from '../../routes.ts'
import { render } from '../../utils/render.tsx'
import { ProjectDetailPage } from './project-detail/page.tsx'
import { ProjectsIndexPage } from './projects-index/page.tsx'

export const projects = {
  actions: {
    index({ request }) {
      return render(<ProjectsIndexPage />, request)
    },
    show({ params, request }) {
      const project = projectItems.find((item) => item.route === params.projectRoute)

      if (!project) {
        return new Response('Not Found', { status: 404 })
      }

      return render(<ProjectDetailPage project={project} />, request)
    },
  },
} satisfies Controller<typeof routes.projects>
