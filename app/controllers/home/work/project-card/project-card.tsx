import { css } from 'remix/ui'

import { mediaPath } from '../../../../data/media.ts'
import { theme } from '../../../../theme/styles.ts'
import type { WorkItem } from '../../../../types/types.ts'
import { bodyCopyStyles } from '../../components/styles.ts'
import { TagList } from '../../components/tag-list/tag-list.tsx'
import { TextLink } from '../../components/text-link/text-link.tsx'
import { ProjectLiveLink } from './project-live-link/project-live-link.tsx'
import { ProjectSourceLink } from './project-source-link/project-source-link.tsx'

export const ProjectCard = () => {
  return ({ project }: { project: WorkItem }) => {
    let imageStyle: { objectPosition: string } | undefined
    let liveLink = null
    let sourceLink = null
    let videoLink = null

    if (project.objectPosition) {
      imageStyle = {
        objectPosition: project.objectPosition,
      }
    }

    if (project.prodLink) {
      liveLink = (
        <ProjectLiveLink
          href={project.prodLink}
          projectName={project.name}
        />
      )
    }

    if (project.repoLink) {
      sourceLink = (
        <ProjectSourceLink
          href={project.repoLink}
          projectName={project.name}
        />
      )
    }

    if (project.videoLink) {
      videoLink = (
        <TextLink
          href={project.videoLink}
          label='Video'
        />
      )
    }

    return (
      <article
        mix={css({
          minHeight: '100%',
          display: 'grid',
          gridTemplateRows: '220px 1fr',
          overflow: 'hidden',
          borderRadius: theme.radius.lg,
          border: `1px solid ${theme.colors.border.subtle}`,
          background: 'rgb(32 34 45 / 0.74)',
          boxShadow: theme.shadow.md,
          '@media (max-width: 520px)': { gridTemplateRows: '180px 1fr' },
        })}
      >
        <img
          src={mediaPath(project.image)}
          alt=''
          style={imageStyle}
          mix={css({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            background: theme.surface.lvl1,
            borderBottom: `1px solid ${theme.colors.border.subtle}`,
          })}
        />
        <div
          mix={css({
            display: 'grid',
            gap: theme.space.lg,
            padding: theme.space.xl,
          })}
        >
          <div>
            <h3
              mix={css({
                margin: 0,
                fontSize: '22px',
                lineHeight: 1.15,
              })}
            >
              {project.name}
            </h3>
            <p
              mix={css({
                ...bodyCopyStyles,
                marginTop: theme.space.sm,
                fontSize: theme.fontSize.md,
              })}
            >
              {project.description}
            </p>
          </div>
          <TagList values={project.technologies} />
          <div
            mix={css({
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: theme.space.sm,
            })}
          >
            {liveLink}
            {sourceLink}
            {videoLink}
          </div>
        </div>
      </article>
    )
  }
}
