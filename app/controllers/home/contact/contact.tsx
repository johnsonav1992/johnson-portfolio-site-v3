import { css } from 'remix/ui'

import { homeContent } from '../../../data/site.ts'
import { routes } from '../../../routes.ts'
import { sectionWrap, theme } from '../../../theme/styles.ts'
import { SecondaryLink } from '../components/secondary-link/secondary-link.tsx'
import { SectionLabel } from '../components/section-label/section-label.tsx'
import { sectionHeading } from '../components/styles.ts'

export const Contact = () => {
  return () => (
    <section
      id='contact'
      mix={[
        sectionWrap,
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.space.xl,
          padding: '52px 0 78px',
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          '@media (max-width: 720px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        }),
      ]}
    >
      <div>
        <SectionLabel>{homeContent.contact.eyebrow}</SectionLabel>
        <h2 mix={sectionHeading}>{homeContent.contact.heading}</h2>
      </div>
      <SecondaryLink
        href={routes.contact.index.href()}
        label='Contact'
      />
    </section>
  )
}
