import { css } from 'remix/ui'
import { featuredProjects } from '../../../data/projects.ts'
import { homeContent } from '../../../data/site.ts'
import { sectionWrap, theme } from '../../../theme/styles.ts'
import { ProjectCard } from '../../../ui/project-card/project-card.tsx'
import { SectionLabel } from '../../../ui/section-label/section-label.tsx'
import { SecondaryLink } from '../components/secondary-link/secondary-link.tsx'
import { sectionHeading } from '../components/styles.ts'

export const Projects = () => {
  return () => (
    <section
      id='projects'
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
          '@media (max-width: 720px)': {
            alignItems: 'start',
            flexDirection: 'column',
          },
        })}
      >
        <div>
          <SectionLabel>{homeContent.projects.eyebrow}</SectionLabel>
          <h2 mix={sectionHeading}>{homeContent.projects.heading}</h2>
        </div>
        <SecondaryLink
          href={homeContent.projects.action.href}
          label={homeContent.projects.action.label}
        />
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
          <ProjectCard
            key={project.name}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}
