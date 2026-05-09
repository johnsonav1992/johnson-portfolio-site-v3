import { css, type Handle, type RemixNode } from 'remix/ui'

import { portfolio, theme } from '../../theme/styles.ts'

export const SectionLabel = (handle: Handle<{ children: RemixNode }>) => {
  return () => {
    const { children } = handle.props

    return (
      <p
        mix={css({
          margin: '0 0 12px',
          color: portfolio.accentGlow,
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.bold,
          textTransform: 'uppercase',
        })}
      >
        {children}
      </p>
    )
  }
}
