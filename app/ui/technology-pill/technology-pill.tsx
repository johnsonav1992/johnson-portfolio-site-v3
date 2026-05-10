import { css, type Handle } from 'remix/ui'

import { mediaPath } from '../../data/media.ts'
import { getTechnologyLogo } from '../../data/technology-logos.ts'
import { theme } from '../../theme/styles.ts'

interface TechnologyPillProps {
  label: string
  size?: 'compact' | 'default'
}

export const TechnologyPill = (handle: Handle<TechnologyPillProps>) => {
  return () => {
    const { label, size = 'default' } = handle.props
    const logo = getTechnologyLogo(label)
    const isCompact = size === 'compact'

    return (
      <span
        mix={css({
          minHeight: isCompact ? '28px' : '34px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: logo ? theme.space.xs : 0,
          padding: logo ? `0 ${theme.space.md} 0 ${theme.space.sm}` : `0 ${theme.space.md}`,
          borderRadius: theme.radius.full,
          border: `1px solid ${theme.colors.border.subtle}`,
          color: theme.colors.text.secondary,
          background: isCompact ? 'rgb(255 255 255 / 0.035)' : 'rgb(255 255 255 / 0.04)',
          fontSize: theme.fontSize.sm,
          fontWeight: isCompact ? theme.fontWeight.normal : theme.fontWeight.medium,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        })}
      >
        {logo ? (
          <span
            aria-hidden='true'
            mix={css({
              width: isCompact ? '18px' : '20px',
              height: isCompact ? '18px' : '20px',
              display: 'inline-grid',
              placeItems: 'center',
              flex: '0 0 auto',
            })}
          >
            <img
              src={mediaPath(logo)}
              alt=''
              mix={css({
                width: isCompact ? '12px' : '14px',
                height: isCompact ? '12px' : '14px',
                display: 'block',
                objectFit: 'contain',
                filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.42))',
              })}
            />
          </span>
        ) : null}
        {label}
      </span>
    )
  }
}
