import { css } from 'remix/ui'

import { appLink, focusRing, theme } from '../../../theme/styles.ts'

interface NavItemProps {
  ariaCurrent?: 'page'
  href: string
  label: string
}

export const NavItem = () => {
  return ({ ariaCurrent, href, label }: NavItemProps) => (
    <a
      aria-current={ariaCurrent}
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
          '&[aria-current="page"]': {
            color: theme.colors.text.primary,
            background: 'rgba(255, 255, 255, 0.08)',
            cursor: 'default',
            pointerEvents: 'none',
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
