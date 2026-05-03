import { css } from 'remix/ui'

import { homeContent } from '../../../data/site.ts'
import { sectionWrap, theme } from '../../../theme/styles.ts'
import { PrimaryLink } from '../components/primary-link/primary-link.tsx'
import { SecondaryLink } from '../components/secondary-link/secondary-link.tsx'
import { SectionLabel } from '../components/section-label/section-label.tsx'
import { Portrait } from './portrait/portrait.tsx'

export const Hero = () => {
  return () => (
    <section
      mix={[
        sectionWrap,
        css({
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.98fr) minmax(300px, 0.92fr)',
          alignItems: 'center',
          gap: '32px',
          padding: '56px 0 40px',
          '@media (max-width: 880px)': {
            gridTemplateColumns: '1fr',
            padding: '30px 0 28px',
          },
        }),
      ]}
    >
      <div
        mix={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          '@media (max-width: 880px)': { alignItems: 'center', textAlign: 'center' },
        })}
      >
        <SectionLabel>{homeContent.hero.eyebrow}</SectionLabel>
        <h1
          mix={css({
            margin: 0,
            maxWidth: '760px',
            fontSize: '78px',
            lineHeight: 0.96,
            fontWeight: theme.fontWeight.bold,
            '@media (max-width: 880px)': { fontSize: '46px' },
          })}
        >
          {homeContent.hero.heading}
        </h1>
        <p
          mix={css({
            margin: 0,
            maxWidth: '620px',
            color: theme.colors.text.secondary,
            fontSize: '21px',
            lineHeight: 1.45,
            '@media (max-width: 880px)': { fontSize: theme.fontSize.lg },
          })}
        >
          {homeContent.hero.body}
        </p>
        <div
          mix={css({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: theme.space.lg,
            paddingTop: theme.space.sm,
            '@media (max-width: 880px)': { justifyContent: 'center' },
          })}
        >
          <PrimaryLink
            href={homeContent.hero.primaryAction.href}
            label={homeContent.hero.primaryAction.label}
          />
          <SecondaryLink
            href={homeContent.hero.secondaryAction.href}
            label={homeContent.hero.secondaryAction.label}
          />
        </div>
      </div>
      <Portrait />
    </section>
  )
}
