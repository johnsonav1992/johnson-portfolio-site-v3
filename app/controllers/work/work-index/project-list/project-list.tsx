import { css } from 'remix/ui'

import { portfolio, theme } from '../../../../theme/styles.ts'
import type { WorkItem } from '../../../../types/types.ts'
import { WorkCard } from '../work-card/work-card.tsx'

interface ProjectListProps {
  heading: string
  projects: WorkItem[]
}

export const ProjectList = () => {
  return ({ heading, projects }: ProjectListProps) => (
    <section
      mix={css({
        display: 'grid',
        gap: theme.space.xxl,
      })}
    >
      <h2
        mix={css({
          width: 'fit-content',
          margin: 0,
          paddingBottom: theme.space.md,
          position: 'relative',
          fontSize: theme.fontSize.xxl,
          lineHeight: 1.12,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '78px',
            height: '3px',
            borderRadius: theme.radius.full,
            background: portfolio.accentGlow,
          },
          '@media (max-width: 560px)': {
            fontSize: '28px',
          },
        })}
      >
        {heading}
      </h2>
      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: theme.space.xl,
          '@media (max-width: 760px)': {
            gridTemplateColumns: '1fr',
          },
        })}
      >
        {projects.map((project) => (
          <WorkCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}
