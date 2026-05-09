import { css, type Handle } from 'remix/ui'
import { Glyph } from 'remix/ui/glyph'

import { appLink, focusRing, theme } from '../../../theme/styles.ts'
import type { SocialIconName } from '../../../types/types.ts'
import { SocialIcon } from '../../social-icon/social-icon.tsx'

interface FooterLinkProps {
  href: string
  icon: SocialIconName
  label: string
}

export const FooterLink = (handle: Handle<FooterLinkProps>) => {
  return () => {
    const { href, label, icon } = handle.props

    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer'
        mix={[
          appLink,
          css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            color: theme.colors.text.primary,
            transition: 'color 160ms ease',
            '&:hover': { color: theme.colors.text.link },
            '&:focus-visible': focusRing,
          }),
        ]}
      >
        <SocialIcon name={icon} />
        <span>{label}</span>
        <Glyph
          name='open'
          aria-hidden='true'
          mix={css({
            width: '0.82em',
            height: '0.82em',
            flex: '0 0 auto',
          })}
        />
      </a>
    )
  }
}
