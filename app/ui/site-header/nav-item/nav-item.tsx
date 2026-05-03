import { css } from 'remix/ui'

import { appLink, focusRing, theme } from '../../../theme/styles.ts'

export const NavItem = () => {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      mix={[
        appLink,
        css({
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '40px',
          padding: '0 12px',
          borderRadius: theme.radius.lg,
          transition: 'color 160ms ease, background 160ms ease',
          '&:hover': {
            color: theme.colors.text.primary,
            background: 'rgba(255, 255, 255, 0.06)',
          },
          '&:focus-visible': focusRing,
          '@media (max-width: 560px)': { padding: '0 8px' },
        }),
      ]}
    >
      {label}
    </a>
  )
}
