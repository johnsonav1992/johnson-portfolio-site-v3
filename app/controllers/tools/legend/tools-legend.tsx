import { css } from 'remix/ui'
import { animateEntrance, spring } from 'remix/ui/animation'

import { toolCategories } from '../../../data/tools.ts'
import { portfolio, sectionWrap, theme } from '../../../theme/styles.ts'

export function ToolsLegend() {
  return () => (
    <section
      mix={[
        sectionWrap,
        css({
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: theme.space.lg,
          padding: '0 0 86px',
          '@media (max-width: 840px)': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          },
          '@media (max-width: 540px)': {
            gridTemplateColumns: '1fr',
          },
        }),
        animateEntrance({
          opacity: 0,
          transform: 'translateY(12px)',
          ...spring('smooth'),
        }),
      ]}
    >
      {toolCategories.map((category) => (
        <div
          key={category.id}
          mix={css({
            display: 'grid',
            gap: theme.space.sm,
            padding: theme.space.lg,
            borderTop: `1px solid ${theme.colors.border.subtle}`,
            background: 'linear-gradient(180deg, rgb(255 255 255 / 0.045), transparent)',
          })}
        >
          <h2
            mix={css({
              margin: 0,
              color: portfolio.accentGlow,
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.bold,
              textTransform: 'uppercase',
            })}
          >
            {category.label}
          </h2>
          <p
            mix={css({
              margin: 0,
              color: theme.colors.text.secondary,
              fontSize: theme.fontSize.sm,
              lineHeight: 1.55,
            })}
          >
            {category.description}
          </p>
        </div>
      ))}
    </section>
  )
}
