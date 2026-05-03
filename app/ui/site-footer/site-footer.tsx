import { css } from 'remix/ui'

import { site, socials } from '../../data/site.ts'
import { sectionWrap, theme } from '../../theme/styles.ts'
import { FooterLink } from './footer-link/footer-link.tsx'

export function SiteFooter() {
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
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '18px 0',
          },
        }),
      ]}
    >
      <span>{`© ${new Date().getFullYear()} ${site.businessName}`}</span>
      <div mix={css({ display: 'flex', alignItems: 'center', gap: '16px' })}>
        {socials.map((item) => (
          <FooterLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </div>
    </footer>
  )
}
