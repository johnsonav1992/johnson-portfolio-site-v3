import type { RemixNode } from 'remix/ui'

import { site } from '../data/site.ts'
import { routes } from '../routes.ts'
import { pageShell } from '../theme/styles.ts'
import { PortfolioTheme } from '../theme/theme.ts'

export interface DocumentProps {
  children?: RemixNode
  title?: string
}

const DEFAULT_TITLE = site.title

export function Document() {
  return ({ title = DEFAULT_TITLE, children }: DocumentProps) => (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <meta
          name="description"
          content={site.description}
        />
        <title>{title}</title>
        <PortfolioTheme.Style />
      </head>
      <body mix={pageShell}>
        {children}
        <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
      </body>
    </html>
  )
}
