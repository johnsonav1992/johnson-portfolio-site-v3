import type { BuildAction } from 'remix/fetch-router'

import type { routes } from '../../routes.ts'
import { render } from '../../utils/render.tsx'
import { ToolsPage } from './page.tsx'

export const tools: BuildAction<'GET', typeof routes.tools> = {
  handler({ request }) {
    return render(<ToolsPage />, request)
  },
}
