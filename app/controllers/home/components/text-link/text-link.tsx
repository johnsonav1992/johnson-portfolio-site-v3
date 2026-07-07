import { css, type Handle } from 'remix/ui'

import { appLink, focusRing, theme } from '../../../../theme/styles.ts'
import { ExternalLinkIcon } from '../../../../ui/icons/external-link-icon.tsx'

interface LinkProps {
  href: string
  label: string
}

export const TextLink = (handle: Handle<LinkProps>) => {
  return () => {
    const { href, label } = handle.props

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
            gap: '5px',
            color: theme.colors.text.link,
            fontWeight: theme.fontWeight.semibold,
            '&:hover': { color: theme.colors.action.primary.backgroundHover },
            '&:focus-visible': focusRing,
          }),
        ]}
      >
        <span>{label}</span>
        <ExternalLinkIcon
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
}
