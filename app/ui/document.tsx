import type { RemixNode } from 'remix/ui'
import { RMX_01_GLYPHS } from 'remix/ui/theme'

import { mediaPath } from '../data/media.ts'
import { site } from '../data/site.ts'
import { routes } from '../routes.ts'
import { pageShell } from '../theme/styles.ts'
import { Theme } from '../theme/theme.ts'

export interface DocumentProps {
  children?: RemixNode
  title?: string
}

const DEFAULT_TITLE = site.title

export function Document() {
  return ({ title = DEFAULT_TITLE, children }: DocumentProps) => (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='color-scheme' content='dark' />
        <meta name='description' content={site.description} />
        <link rel='icon' href={`${mediaPath('favicon.png')}?v=old-site-static`} type='image/png' />
        <title>{title}</title>
        <Theme />
      </head>
      <body mix={pageShell}>
        <RMX_01_GLYPHS />
        {children}
        <script type='module' src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
      </body>
    </html>
  )
}
