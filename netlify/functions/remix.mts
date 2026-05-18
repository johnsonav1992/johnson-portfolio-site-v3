import type { Config, Context } from '@netlify/functions'

import { router } from '../../app/router.ts'

// biome-ignore lint/style/noDefaultExport: Netlify Functions require a default-exported handler.
export default async function remixHandler(request: Request, _context: Context): Promise<Response> {
  try {
    return await router.fetch(request)
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const config: Config = {
  path: '/*',
  preferStatic: true,
}
