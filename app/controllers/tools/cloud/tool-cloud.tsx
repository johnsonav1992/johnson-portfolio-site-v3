import { css } from 'remix/ui'
import { animateEntrance, spring } from 'remix/ui/animation'

import { toolCloudPositions, tools } from '../../../data/tools.ts'
import { sectionWrap, theme } from '../../../theme/styles.ts'
import { ToolOrb } from './tool-orb/tool-orb.tsx'

const toolsById = new Map(tools.map((tool) => [tool.id, tool]))

export const ToolCloud = () => {
  return () => (
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

          return tool ? (
            <ToolOrb
              glow={tool.glow}
              image={tool.image}
              key={tool.id}
              monogram={tool.monogram}
              name={tool.name}
              size={size}
              tilt={tool.tilt}
              x={x}
              y={y}
            />
          ) : null
        })}
      </div>
    </section>
  )
}
