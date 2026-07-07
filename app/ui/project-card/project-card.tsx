import { css, type Handle } from 'remix/ui'

import { mediaPath } from '../../data/media.ts'
import { routes } from '../../routes.ts'
import { appLink, focusRing, portfolio, theme } from '../../theme/styles.ts'
import type { ProjectItem } from '../../types/types.ts'
import { ChevronRightIcon } from '../icons/chevron-right-icon.tsx'
import { TechnologyPill } from '../technology-pill/technology-pill.tsx'

interface ProjectCardProps {
  project: ProjectItem
}

const visibleTechnologyCount = 4

export const ProjectCard = (handle: Handle<ProjectCardProps>) => {
  return () => {
    const { project } = handle.props
    const visibleTechnologies = project.technologies.slice(0, visibleTechnologyCount)
    const hiddenTechnologyCount = project.technologies.length - visibleTechnologies.length
    let imageStyle: { objectPosition: string } | undefined

    if (project.objectPosition) {
      imageStyle = {
        objectPosition: project.objectPosition,
      }
    }

    return (
      <a
        href={routes.projects.show.href({ projectRoute: project.route })}
        aria-label={`View ${project.name} project details`}
        mix={[
          appLink,
          css({
            minHeight: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(220px, 18vw) 1fr',
            overflow: 'hidden',
            borderRadius: theme.radius.lg,
            border: `1px solid ${theme.colors.border.subtle}`,
            background: 'rgb(32 34 45 / 0.72)',
            boxShadow: theme.shadow.md,
            transition:
              'transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              borderColor: `color-mix(in srgb, ${portfolio.accentGlow}, white 18%)`,
              background: 'rgb(38 41 54 / 0.82)',
              boxShadow: theme.shadow.lg,
            },
            '&:focus-visible': focusRing,
            '&:hover img': {
              transform: 'scale(1.035)',
            },
            '@media (max-width: 720px)': {
              gridTemplateRows: '210px 1fr',
            },
          }),
        ]}
      >
        <span
          mix={css({
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            background: theme.surface.lvl1,
            borderBottom: `1px solid ${theme.colors.border.subtle}`,
          })}
        >
          <img
            src={mediaPath(project.image)}
            alt=''
            style={imageStyle}
            mix={css({
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'center top',
              transition: 'transform 260ms ease',
            })}
          />
        </span>
        <span
          mix={css({
            display: 'grid',
            gap: theme.space.md,
            alignContent: 'start',
            padding: theme.space.xl,
          })}
        >
          <span
            mix={css({
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'space-between',
              gap: theme.space.md,
            })}
          >
            <span
              mix={css({
                color: theme.colors.text.primary,
                fontSize: theme.fontSize.xl,
                fontWeight: theme.fontWeight.bold,
                lineHeight: 1.15,
              })}
            >
              {project.name}
            </span>
            <ChevronRightIcon
              aria-hidden='true'
              mix={css({
                width: '18px',
                height: '18px',
                flex: '0 0 auto',
                marginTop: '3px',
                color: theme.colors.text.link,
              })}
            />
          </span>
          <span
            mix={css({
              color: theme.colors.text.secondary,
              fontSize: theme.fontSize.md,
              lineHeight: theme.lineHeight.normal,
            })}
          >
            {project.description}
          </span>
          <span
            mix={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.space.sm,
              marginTop: theme.space.xs,
            })}
          >
            {visibleTechnologies.map((technology) => (
              <TechnologyPill
                key={technology}
                label={technology}
                size='compact'
              />
            ))}
            {hiddenTechnologyCount > 0 ? (
              <span
                mix={css({
                  minHeight: '28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: `0 ${theme.space.xs}`,
                  color: theme.colors.text.muted,
                  fontSize: theme.fontSize.sm,
                  fontStyle: 'italic',
                })}
              >
                and {hiddenTechnologyCount} more
              </span>
            ) : null}
          </span>
        </span>
      </a>
    )
  }
}
