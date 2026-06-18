import type { Controller } from 'remix/fetch-router'

import { projects as projectItems } from '../../data/projects.ts'
import type { routes } from '../../routes.ts'
import type { AppRequestContext } from '../../types/router.ts'
import { render } from '../../utils/render.tsx'
import { renderNotFound } from '../not-found/controller.tsx'
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
        return renderNotFound(request)
      }

      return render(<ProjectDetailPage project={project} />, request)
    },
  },
} satisfies Controller<typeof routes.projects, AppRequestContext>
