import { css } from 'remix/ui'
import { mediaPath } from '../../data/media.ts'
import { site, socials } from '../../data/site.ts'
import { appLink, focusRing, sectionWrap, theme } from '../../theme/styles.ts'
import { FooterLink } from './footer-link/footer-link.tsx'

const remixHref = 'https://remix.run/'

export const SiteFooter = () => {
  return () => (
    <footer
      mix={[
        sectionWrap,
        css({
          position: 'relative',
          zIndex: 1,
          minHeight: '82px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          color: theme.colors.text.secondary,
          fontSize: '14px',
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          '@media (max-width: 620px)': {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px 0',
            textAlign: 'center',
          },
        }),
      ]}
    >
      <span>{`© ${new Date().getFullYear()} ${site.businessName}`}</span>
      <a
        href={remixHref}
        target='_blank'
        rel='noreferrer'
        aria-label='Remix framework website'
        mix={[
          appLink,
          css({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'inherit',
            transition: 'color 160ms ease',
            '&:hover': {
              color: theme.colors.text.link,
            },
            '&:focus-visible': focusRing,
          }),
        ]}
      >
        <span>Made with ❤️ with</span>
        <img
          src={mediaPath('tools/remix.svg')}
          alt='Remix'
          mix={css({
            width: '30px',
          })}
        />
      </a>
      <div
        mix={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        })}
      >
        {socials.map((item) => (
          <FooterLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </footer>
  )
}
