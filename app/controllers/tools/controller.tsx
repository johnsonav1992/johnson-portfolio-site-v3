import type { Action } from 'remix/fetch-router'

import type { routes } from '../../routes.ts'
import type { AppRequestContext } from '../../types/router.ts'
import { render } from '../../utils/render.tsx'
import { ToolsPage } from './page.tsx'

export const tools: Action<typeof routes.tools, AppRequestContext> = {
  handler({ request }) {
    return render(<ToolsPage />, request)
  },
}
