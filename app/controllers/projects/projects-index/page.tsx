import { css } from 'remix/ui'

import { featuredProjects, projects, projectsContent } from '../../../data/projects.ts'
import { sectionWrap, theme } from '../../../theme/styles.ts'
import { Layout } from '../../../ui/layout.tsx'
import { ProjectList } from './project-list/project-list.tsx'

const moreProjects = projects.filter((project) => !project.featured)

export const ProjectsIndexPage = () => {
  return () => (
    <Layout
      currentPath='/projects'
      title={projectsContent.title}
    >
      <section
        mix={[
          sectionWrap,
          css({
            padding: '76px 0 46px',
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
              color: theme.colors.text.link,
              fontWeight: theme.fontWeight.bold,
            })}
          >
            {projectsContent.eyebrow}
          </p>
          <h1
            mix={css({
              margin: 0,
              fontSize: '56px',
              lineHeight: 1.04,
              letterSpacing: 0,
              '@media (max-width: 620px)': {
                fontSize: '40px',
              },
            })}
          >
            {projectsContent.heading}
          </h1>
          <p
            mix={css({
              margin: 0,
              maxWidth: '690px',
              color: theme.colors.text.secondary,
              fontSize: theme.fontSize.lg,
              lineHeight: theme.lineHeight.relaxed,
            })}
          >
            {projectsContent.body}
          </p>
        </div>
      </section>
      <div
        mix={[
          sectionWrap,
          css({
            display: 'grid',
            gap: '72px',
            padding: '34px 0 88px',
            borderTop: `1px solid ${theme.colors.border.subtle}`,
          }),
        ]}
      >
        <ProjectList
          heading={projectsContent.sections.featured}
          projects={featuredProjects}
        />
        <ProjectList
          heading={projectsContent.sections.more}
          projects={moreProjects}
        />
      </div>
    </Layout>
  )
}
