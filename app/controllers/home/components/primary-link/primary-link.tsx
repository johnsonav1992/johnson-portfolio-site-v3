import { css } from 'remix/ui'

import { appLink, focusRing, theme } from '../../../../theme/styles.ts'

export const PrimaryLink = () => {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      mix={[
        appLink,
        css({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme.control.height.lg,
          padding: `0 ${theme.space.xl}`,
          borderRadius: theme.radius.lg,
          background: theme.colors.action.primary.background,
          color: theme.colors.action.primary.foreground,
          fontWeight: theme.fontWeight.bold,
          boxShadow: '0 16px 34px rgba(78, 167, 255, 0.24)',
          '&:hover': { background: theme.colors.action.primary.backgroundHover },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      {label}
    </a>
  )
}
