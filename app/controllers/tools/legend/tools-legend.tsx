import { css, on } from 'remix/ui'
import { animateEntrance, spring } from 'remix/ui/animation'

import { toolCategories, tools } from '../../../data/tools.ts'
import { portfolio, sectionWrap, theme } from '../../../theme/styles.ts'
import type { ToolCategory } from '../../../types/types.ts'

export interface ToolsLegendProps {
  activeCategory: ToolCategory | 'all'
  onSelectCategory: (category: ToolCategory | 'all') => void
}

export const ToolsLegend = () => {
  return ({ activeCategory, onSelectCategory }: ToolsLegendProps) => (
    <section
      mix={[
        sectionWrap,
        css({
          display: 'grid',
          gap: theme.space.lg,
          padding: '0 0 42px',
        }),
        animateEntrance({
          opacity: 0,
          transform: 'translateY(12px)',
          ...spring('smooth'),
        }),
      ]}
    >
      <div
        mix={css({
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'end',
          justifyContent: 'space-between',
          gap: theme.space.lg,
        })}
      >
        <div
          mix={css({
            display: 'grid',
            gap: theme.space.sm,
            maxWidth: '680px',
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
            Explore the stack
          </p>
          <h2
            mix={css({
              margin: 0,
              fontSize: theme.fontSize.xxl,
            })}
          >
            Spotlight a category.
          </h2>
          <p
            mix={css({
              margin: 0,
              color: theme.colors.text.secondary,
              lineHeight: 1.6,
            })}
          >
            Pick a lane to keep related tools bright in the cloud. Click the same category again to
            clear it.
          </p>
        </div>
        <button
          type='button'
          mix={[
            css({
              minHeight: theme.control.height.md,
              display: 'inline-flex',
              alignItems: 'center',
              gap: theme.space.sm,
              padding: `0 ${theme.space.lg}`,
              borderRadius: theme.radius.full,
              border: `1px solid ${theme.colors.border.default}`,
              background: 'rgb(255 255 255 / 0.04)',
              color: theme.colors.text.primary,
              cursor: 'pointer',
              transition: spring.transition(['background', 'border-color', 'transform'], 'snappy'),
              '&:hover': {
                borderColor: theme.colors.text.link,
                background: 'rgb(255 255 255 / 0.08)',
                transform: 'translateY(-1px)',
              },
            }),
            on('click', () => onSelectCategory('all')),
          ]}
        >
          <span>All tools</span>
          <span mix={css({ color: theme.colors.text.secondary })}>{tools.length}</span>
        </button>
      </div>
      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: theme.space.lg,
          '@media (max-width: 840px)': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          },
          '@media (max-width: 540px)': {
            gridTemplateColumns: '1fr',
          },
        })}
      >
        {toolCategories.map((category) => {
          const isActive = activeCategory === category.id
          const count = tools.filter((tool) => tool.category === category.id).length

          return (
            <button
              key={category.id}
              type='button'
              aria-pressed={isActive}
              mix={[
                css({
                  display: 'grid',
                  gap: theme.space.sm,
                  padding: theme.space.lg,
                  textAlign: 'left',
                  borderRadius: theme.radius.xl,
                  border: `1px solid ${theme.colors.border.subtle}`,
                  background: 'linear-gradient(180deg, rgb(255 255 255 / 0.045), transparent)',
                  color: 'inherit',
                  cursor: 'pointer',
                  transition: spring.transition(
                    ['transform', 'border-color', 'background', 'box-shadow'],
                    'smooth',
                  ),
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: theme.colors.text.link,
                    background: 'linear-gradient(180deg, rgb(255 255 255 / 0.08), transparent)',
                  },
                }),
                isActive
                  ? css({
                      borderColor: portfolio.accentGlow,
                      background:
                        'linear-gradient(180deg, color-mix(in srgb, rgb(131 247 176 / 0.18), transparent), transparent)',
                      boxShadow: `0 18px 34px ${portfolio.accentGlow}14`,
                    })
                  : null,
                on('click', () => onSelectCategory(category.id)),
              ]}
            >
              <div
                mix={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: theme.space.md,
                })}
              >
                <h3
                  mix={css({
                    margin: 0,
                    color: portfolio.accentGlow,
                    fontSize: theme.fontSize.sm,
                    fontWeight: theme.fontWeight.bold,
                    textTransform: 'uppercase',
                  })}
                >
                  {category.label}
                </h3>
                <span
                  mix={css({
                    color: theme.colors.text.secondary,
                    fontSize: theme.fontSize.sm,
                  })}
                >
                  {count}
                </span>
              </div>
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
            </button>
          )
        })}
      </div>
    </section>
  )
}
