import type { Handle, RemixNode } from 'remix/ui'
import { RMX_01_GLYPHS } from 'remix/ui/theme'

import { assets } from '../assets.ts'
import { mediaPath } from '../data/media.ts'
import { site } from '../data/site.ts'
import { pageShell } from '../theme/styles.ts'
import { Theme } from '../theme/theme.ts'

export interface DocumentProps {
  children?: RemixNode
  title?: string
}

const DEFAULT_TITLE = site.title
const clientEntrySrc = await assets.getHref('app/assets/entry.ts')

export const Document = (handle: Handle<DocumentProps>) => {
  return () => {
    const { title = DEFAULT_TITLE, children } = handle.props

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <meta
            name='color-scheme'
            content='dark'
          />
          <meta
            name='description'
            content={site.description}
          />
          <link
            rel='icon'
            href={`${mediaPath('favicon.png')}?v=old-site-static`}
            type='image/png'
          />
          <title>{title}</title>
          <Theme />
        </head>
        <body mix={pageShell}>
          <RMX_01_GLYPHS />
          {children}
          <script
            type='module'
            src={clientEntrySrc}
          />
        </body>
      </html>
    )
  }
}
