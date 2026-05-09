import { render } from '../../utils/render.tsx'
import { NotFoundPage } from './page.tsx'

export const renderNotFound = (request: Request) => {
  return render(<NotFoundPage />, request, { status: 404 })
}
