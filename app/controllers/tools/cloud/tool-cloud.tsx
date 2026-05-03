import { css } from 'remix/ui'
import { animateEntrance, spring } from 'remix/ui/animation'

import { toolCategories, toolCloudPositions, tools } from '../../../data/tools.ts'
import { portfolio, sectionWrap, theme } from '../../../theme/styles.ts'
import type { ToolCategory } from '../../../types/types.ts'
import { ToolOrb } from './tool-orb/tool-orb.tsx'

const toolsById = new Map(tools.map((tool) => [tool.id, tool]))
const categoryById = new Map(toolCategories.map((category) => [category.id, category]))

export interface ToolCloudProps {
  activeCategory: ToolCategory | 'all'
  onSelectCategory: (category: ToolCategory) => void
}

export const ToolCloud = () => {
  return ({ activeCategory, onSelectCategory }: ToolCloudProps) => {
    const activeSummary = activeCategory === 'all' ? null : categoryById.get(activeCategory)
    const activeCount =
      activeCategory === 'all'
        ? tools.length
        : tools.filter((tool) => tool.category === activeCategory).length

    return (
      <section
        aria-label='Technology tool cloud'
        mix={[
          sectionWrap,
          css({
            padding: '26px 0 72px',
            borderTop: `1px solid ${theme.colors.border.subtle}`,
          }),
        ]}
      >
        <div
          mix={css({
            display: 'grid',
            gap: theme.space.lg,
            marginBottom: theme.space.xl,
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
            Technology cloud
          </p>
          <div
            key={activeCategory}
            mix={[
              css({
                display: 'grid',
                gap: theme.space.xs,
                padding: theme.space.lg,
                border: `1px solid ${theme.colors.border.subtle}`,
                borderRadius: theme.radius.xl,
                background:
                  'linear-gradient(135deg, rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.02))',
              }),
              animateEntrance({
                opacity: 0,
                transform: 'translateY(10px)',
                ...spring('smooth'),
              }),
            ]}
          >
            <strong mix={css({ fontSize: theme.fontSize.lg })}>
              {activeSummary ? activeSummary.label : 'All tools'}
            </strong>
            <p
              mix={css({
                margin: 0,
                color: theme.colors.text.secondary,
                fontSize: theme.fontSize.md,
                lineHeight: 1.6,
              })}
            >
              {activeSummary
                ? `${activeSummary.description} ${activeCount} tools are highlighted in the cloud below.`
                : `${activeCount} tools are currently in the cloud. Select a category to spotlight a slice of the stack.`}
            </p>
          </div>
        </div>
        <div
          mix={[
            css({
              minHeight: '1220px',
              display: 'block',
              position: 'relative',
              overflow: 'visible',
              margin: '0 auto',
              maxWidth: '1100px',
              borderRadius: theme.radius.full,
              background:
                'radial-gradient(circle at 50% 50%, rgb(131 247 176 / 0.08), transparent 58%)',
              '@media (max-width: 720px)': {
                minHeight: 'auto',
                maxWidth: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '18px',
                padding: '30px 0',
                borderRadius: 0,
                background: 'none',
              },
            }),
            animateEntrance({
              opacity: 0,
              transform: 'scale(0.98)',
              ...spring('smooth'),
            }),
          ]}
        >
          {toolCloudPositions.map(({ id, x, y, size }) => {
            const tool = toolsById.get(id)

            if (!tool) {
              return null
            }

            const highlighted = activeCategory === 'all' || tool.category === activeCategory

            return (
              <ToolOrb
                key={tool.id}
                onSelectCategory={onSelectCategory}
                persistentLabel={activeCategory !== 'all' && tool.category === activeCategory}
                size={size}
                subdued={!highlighted}
                tool={tool}
                x={x}
                y={y}
              />
            )
          })}
        </div>
      </section>
    )
  }
}
