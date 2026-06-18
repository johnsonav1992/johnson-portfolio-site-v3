import type { Action } from 'remix/fetch-router'

import type { routes } from '../../routes.ts'
import type { AppRequestContext } from '../../types/router.ts'
import { render } from '../../utils/render.tsx'
import { HomePage } from './page.tsx'

export const home: Action<typeof routes.home, AppRequestContext> = {
  handler({ request }) {
    return render(<HomePage />, request)
  },
}
