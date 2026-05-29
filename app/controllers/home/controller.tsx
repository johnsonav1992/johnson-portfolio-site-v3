import type { Action } from 'remix/fetch-router'

import type { routes } from '../../routes.ts'
import { render } from '../../utils/render.tsx'
import { HomePage } from './page.tsx'

export const home: Action<typeof routes.home> = {
  handler({ request }) {
    return render(<HomePage />, request)
  },
}
