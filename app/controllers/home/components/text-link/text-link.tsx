import { css } from 'remix/ui'
import { Glyph } from 'remix/ui/glyph'

import { appLink, focusRing, theme } from '../../../../theme/styles.ts'

export function TextLink() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      mix={[
        appLink,
        css({
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          color: theme.colors.text.link,
          fontWeight: theme.fontWeight.semibold,
          '&:hover': { color: theme.colors.action.primary.backgroundHover },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      <span>{label}</span>
      <Glyph
        name='open'
        aria-hidden='true'
        mix={css({
          width: '0.86em',
          height: '0.86em',
          flex: '0 0 auto',
        })}
      />
    </a>
  )
}
