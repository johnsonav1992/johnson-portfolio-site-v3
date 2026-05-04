import { css } from 'remix/ui'

import { contactPageContent } from '../../../data/site.ts'
import { theme } from '../../../theme/styles.ts'
import { cardStyles } from '../styles.ts'

export const ContactOverviewCard = () => {
  return () => (
    <section
      mix={[
        cardStyles,
        css({
          display: 'grid',
          gap: theme.space.md,
          padding: '34px',
          background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
          boxShadow: theme.shadow.lg,
          '@media (max-width: 620px)': {
            padding: '26px',
          },
        }),
      ]}
    >
      <div
        mix={css({
          display: 'grid',
          gap: '18px',
        })}
      >
        <h1
          mix={css({
            margin: 0,
            maxWidth: '14ch',
            fontSize: '54px',
            lineHeight: 1,
            '@media (max-width: 620px)': {
              fontSize: '38px',
            },
          })}
        >
          {contactPageContent.heading}
        </h1>
        <p
          mix={css({
            margin: 0,
            maxWidth: '42rem',
            color: theme.colors.text.secondary,
            fontSize: theme.fontSize.lg,
            lineHeight: theme.lineHeight.relaxed,
          })}
        >
          {contactPageContent.body}
        </p>
      </div>
    </section>
  )
}
