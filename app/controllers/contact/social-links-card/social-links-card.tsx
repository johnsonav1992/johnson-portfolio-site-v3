import { css } from 'remix/ui'

import { socials } from '../../../data/site.ts'
import { theme } from '../../../theme/styles.ts'
import { FooterLink } from '../../../ui/site-footer/footer-link/footer-link.tsx'
import { contactPageContent } from '../content.ts'

export const SocialLinksCard = () => {
  return () => (
    <aside
      mix={css({
        display: 'grid',
        gap: theme.space.md,
        padding: '24px 28px',
        borderRadius: theme.radius.xl,
        border: `1px solid ${theme.colors.border.subtle}`,
        background: 'rgba(255, 255, 255, 0.03)',
        boxShadow: theme.shadow.md,
      })}
    >
      <div
        mix={css({
          display: 'grid',
          gap: theme.space.sm,
        })}
      >
        <h2
          mix={css({
            margin: 0,
            fontSize: '24px',
            lineHeight: 1.08,
          })}
        >
          {contactPageContent.socialHeading}
        </h2>
        <p
          mix={css({
            margin: 0,
            color: theme.colors.text.secondary,
            lineHeight: theme.lineHeight.relaxed,
          })}
        >
          {contactPageContent.socialBody}
        </p>
      </div>
      <div
        mix={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.space.lg,
          paddingTop: theme.space.md,
          borderTop: `1px solid ${theme.colors.border.subtle}`,
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
    </aside>
  )
}
