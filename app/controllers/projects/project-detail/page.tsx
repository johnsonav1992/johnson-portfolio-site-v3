import { css } from 'remix/ui'
import { Glyph } from 'remix/ui/glyph'

import { mediaPath } from '../../../data/media.ts'
import { projectsContent } from '../../../data/projects.ts'
import { routes } from '../../../routes.ts'
import { appLink, focusRing, sectionWrap, theme } from '../../../theme/styles.ts'
import type { ProjectItem } from '../../../types/types.ts'
import { Layout } from '../../../ui/layout.tsx'
import { ProjectActions } from '../components/project-actions/project-actions.tsx'

interface ProjectDetailPageProps {
  project: ProjectItem
}

export const ProjectDetailPage = () => {
  return ({ project }: ProjectDetailPageProps) => {
    let imageStyle: { objectPosition: string } | undefined

    if (project.objectPosition) {
      imageStyle = {
        objectPosition: project.objectPosition,
      }
    }

    return (
      <Layout
        currentPath='/projects'
        title={`${project.name} - ${projectsContent.detail.titleSuffix}`}
      >
        <article
          mix={[
            sectionWrap,
            css({
              display: 'grid',
              gap: theme.space.xxl,
              padding: '54px 0 88px',
            }),
          ]}
        >
          <a
            href={routes.projects.index.href()}
            mix={[
              appLink,
              css({
                width: 'fit-content',
                display: 'inline-flex',
                alignItems: 'center',
                gap: theme.space.sm,
                color: theme.colors.text.secondary,
                fontWeight: theme.fontWeight.semibold,
                '&:hover': {
                  color: theme.colors.text.primary,
                },
                '&:focus-visible': focusRing,
              }),
            ]}
          >
            <Glyph
              name='chevronRight'
              aria-hidden='true'
              mix={css({
                width: '16px',
                height: '16px',
                transform: 'rotate(180deg)',
              })}
            />
            <span>{projectsContent.detail.backLabel}</span>
          </a>
          <div
            mix={css({
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.92fr) minmax(360px, 1.08fr)',
              gap: '58px',
              alignItems: 'start',
              '@media (max-width: 920px)': {
                gridTemplateColumns: '1fr',
                gap: theme.space.xxl,
              },
            })}
          >
            <div
              mix={css({
                display: 'grid',
                gap: theme.space.xxl,
                alignContent: 'start',
              })}
            >
              <div
                mix={css({
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
                  {projectsContent.detail.eyebrow}
                </p>
                <h1
                  mix={css({
                    margin: 0,
                    fontSize: '52px',
                    lineHeight: 1.04,
                    letterSpacing: 0,
                    '@media (max-width: 620px)': {
                      fontSize: '38px',
                    },
                  })}
                >
                  {project.name}
                </h1>
                <p
                  mix={css({
                    margin: 0,
                    color: theme.colors.text.secondary,
                    fontSize: theme.fontSize.lg,
                    lineHeight: theme.lineHeight.relaxed,
                  })}
                >
                  {project.description}
                </p>
              </div>
              <section
                mix={css({
                  display: 'grid',
                  gap: theme.space.md,
                })}
              >
                <h2
                  mix={css({
                    margin: 0,
                    fontSize: theme.fontSize.xl,
                    lineHeight: 1.2,
                  })}
                >
                  {projectsContent.detail.technologiesHeading}
                </h2>
                <ul
                  mix={css({
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.space.sm,
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                  })}
                >
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      mix={css({
                        minHeight: '34px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: `0 ${theme.space.md}`,
                        borderRadius: theme.radius.full,
                        border: `1px solid ${theme.colors.border.subtle}`,
                        color: theme.colors.text.secondary,
                        background: 'rgb(255 255 255 / 0.04)',
                        fontSize: theme.fontSize.sm,
                        fontWeight: theme.fontWeight.medium,
                      })}
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </section>
              <ProjectActions project={project} />
            </div>
            <div
              mix={css({
                overflow: 'hidden',
                borderRadius: theme.radius.lg,
                border: `1px solid ${theme.colors.border.subtle}`,
                background: theme.surface.lvl1,
                boxShadow: theme.shadow.xl,
              })}
            >
              <img
                src={mediaPath(project.image)}
                alt={`${project.name} ${projectsContent.detail.screenshotAltSuffix}`}
                style={imageStyle}
                mix={css({
                  width: '100%',
                  minHeight: '360px',
                  maxHeight: '680px',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  '@media (max-width: 620px)': {
                    minHeight: '260px',
                  },
                })}
              />
            </div>
          </div>
        </article>
      </Layout>
    )
  }
}
