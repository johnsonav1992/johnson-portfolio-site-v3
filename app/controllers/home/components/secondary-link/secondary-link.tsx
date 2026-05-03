import { css } from 'remix/ui'

import { appLink, focusRing, theme } from '../../../../theme/styles.ts'

export function SecondaryLink() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      mix={[
        appLink,
        css({
          maxWidth: '100%',
          overflowWrap: 'anywhere',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme.control.height.lg,
          padding: `0 ${theme.space.xl}`,
          borderRadius: theme.radius.lg,
          border: `1px solid ${theme.colors.action.secondary.border}`,
          color: theme.colors.action.secondary.foreground,
          background: theme.colors.action.secondary.background,
          '&:hover': { borderColor: theme.colors.text.link },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      {label}
    </a>
  )
}
