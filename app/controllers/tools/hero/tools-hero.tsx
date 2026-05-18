import { css } from 'remix/ui'

import { toolsContent } from '../../../data/tools.ts'
import { portfolio, sectionWrap, theme } from '../../../theme/styles.ts'

export const ToolsHero = () => {
  return () => (
    <section
      mix={[
        sectionWrap,
        css({
          minHeight: '320px',
          display: 'grid',
          alignItems: 'end',
          padding: '74px 0 34px',
          '@media (max-width: 720px)': {
            minHeight: 'auto',
            padding: '52px 0 28px',
          },
        }),
      ]}
    >
      <div
        mix={css({
          maxWidth: '820px',
          display: 'grid',
          gap: theme.space.lg,
        })}
      >
        <p
          mix={css({
            margin: 0,
            color: portfolio.accentGlow,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.bold,
            textTransform: 'uppercase',
          })}
        >
          {toolsContent.eyebrow}
        </p>
        <h1
          mix={css({
            margin: 0,
            fontSize: '70px',
            lineHeight: 0.98,
            fontWeight: theme.fontWeight.bold,
            '@media (max-width: 720px)': { fontSize: '44px' },
          })}
        >
          {toolsContent.heading}
        </h1>
        <p
          mix={css({
            margin: 0,
            maxWidth: '680px',
            color: theme.colors.text.secondary,
            fontSize: '20px',
            lineHeight: 1.5,
            '@media (max-width: 720px)': { fontSize: theme.fontSize.lg },
          })}
        >
          {toolsContent.body}
        </p>
      </div>
    </section>
  )
}
