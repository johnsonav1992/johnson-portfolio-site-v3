import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'

import { portfolio } from '../theme/styles.ts'
import { Document } from './document.tsx'
import { SiteFooter } from './site-footer/site-footer.tsx'
import { SiteHeader } from './site-header/site-header.tsx'

export interface LayoutProps {
  children?: RemixNode
  currentPath?: string
  title?: string
}

export const Layout = (handle: Handle<LayoutProps>) => {
  return () => {
    const { title, currentPath, children } = handle.props

    return (
      <Document title={title}>
        <div
          mix={css({
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowX: 'hidden',
            '&::before': {
              content: '""',
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              background: `linear-gradient(90deg, rgba(78, 167, 255, 0.09), transparent 34%, ${portfolio.accentGlow}14 72%, transparent)`,
              maskImage: 'linear-gradient(to bottom, black, transparent 76%)',
            },
          })}
        >
          <SiteHeader currentPath={currentPath} />
          <main
            mix={css({
              position: 'relative',
              zIndex: 1,
              flex: '1 0 auto',
            })}
          >
            {children}
          </main>
          <SiteFooter />
        </div>
      </Document>
    )
  }
}
