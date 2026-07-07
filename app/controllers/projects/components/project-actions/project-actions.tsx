import { css, type Handle } from 'remix/ui'

import { projectsContent } from '../../../../data/projects.ts'
import { appLink, focusRing, theme } from '../../../../theme/styles.ts'
import type { ProjectItem } from '../../../../types/types.ts'
import { ExternalLinkIcon } from '../../../../ui/icons/external-link-icon.tsx'
import { GithubIcon } from '../../../../ui/social-icon/github-icon/github-icon.tsx'

interface ProjectActionsProps {
  project: ProjectItem
}

const actionLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.sm,
  minHeight: theme.control.height.lg,
  padding: `0 ${theme.space.xl}`,
  borderRadius: theme.radius.lg,
  fontWeight: theme.fontWeight.bold,
  transition:
    'background 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
  '&:focus-visible': focusRing,
})

const primaryAction = css({
  background: theme.colors.action.primary.background,
  color: theme.colors.action.primary.foreground,
  boxShadow: '0 16px 34px rgba(78, 167, 255, 0.2)',
  '&:hover': {
    background: theme.colors.action.primary.backgroundHover,
  },
})

const secondaryAction = css({
  border: `1px solid ${theme.colors.action.secondary.border}`,
  color: theme.colors.action.secondary.foreground,
  background: theme.colors.action.secondary.background,
  '&:hover': {
    borderColor: theme.colors.text.link,
    background: theme.colors.action.secondary.backgroundHover,
  },
})

const actionIcon = css({
  width: '17px',
  height: '17px',
  flex: '0 0 auto',
})

export const ProjectActions = (handle: Handle<ProjectActionsProps>) => {
  return () => {
    const { project } = handle.props

    return (
      <div
        mix={css({
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: theme.space.md,
        })}
      >
        {project.prodLink ? (
          <a
            href={project.prodLink}
            target='_blank'
            rel='noreferrer'
            mix={[appLink, actionLink, primaryAction]}
          >
            <span>{projectsContent.detail.liveActionLabel}</span>
            <ExternalLinkIcon
              aria-hidden='true'
              mix={actionIcon}
            />
          </a>
        ) : null}
        {project.repoLink ? (
          <a
            href={project.repoLink}
            target='_blank'
            rel='noreferrer'
            mix={[appLink, actionLink, secondaryAction]}
          >
            <GithubIcon />
            <span>{projectsContent.detail.repositoryActionLabel}</span>
            <ExternalLinkIcon
              aria-hidden='true'
              mix={actionIcon}
            />
          </a>
        ) : null}
        {project.videoLink ? (
          <a
            href={project.videoLink}
            target='_blank'
            rel='noreferrer'
            mix={[appLink, actionLink, secondaryAction]}
          >
            <span>{projectsContent.detail.videoActionLabel}</span>
            <ExternalLinkIcon
              aria-hidden='true'
              mix={actionIcon}
            />
          </a>
        ) : null}
      </div>
    )
  }
}
