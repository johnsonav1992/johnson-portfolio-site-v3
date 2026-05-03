import { css } from 'remix/ui'

import { homeContent } from '../../../data/site.ts'
import { featuredProjects } from '../../../data/work.ts'
import { sectionWrap, theme } from '../../../theme/styles.ts'
import { SecondaryLink } from '../components/secondary-link/secondary-link.tsx'
import { SectionLabel } from '../components/section-label/section-label.tsx'
import { sectionHeading } from '../components/styles.ts'
import { ProjectCard } from './project-card/project-card.tsx'

export function Work() {
  return () => (
    <section
      id='work'
      mix={[
        sectionWrap,
        css({
          padding: '52px 0',
          borderTop: `1px solid ${theme.colors.border.subtle}`,
        }),
      ]}
    >
      <div
        mix={css({
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          gap: theme.space.xl,
          marginBottom: theme.space.xxl,
          '@media (max-width: 720px)': { alignItems: 'start', flexDirection: 'column' },
        })}
      >
        <div>
          <SectionLabel>{homeContent.work.eyebrow}</SectionLabel>
          <h2 mix={sectionHeading}>{homeContent.work.heading}</h2>
        </div>
        <SecondaryLink href={homeContent.work.action.href} label={homeContent.work.action.label} />
      </div>
      <div
        mix={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: theme.space.lg,
          '@media (max-width: 760px)': { gridTemplateColumns: '1fr' },
        })}
      >
        {featuredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}
