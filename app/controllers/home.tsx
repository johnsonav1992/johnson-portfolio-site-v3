import type { BuildAction } from 'remix/fetch-router'
import { css, type RemixNode } from 'remix/ui'

import { homeContent, site } from '../data/site.ts'
import { featuredProjects } from '../data/work.ts'
import { routes } from '../routes.ts'
import { appLink, focusRing, portfolio, sectionWrap, theme } from '../theme/styles.ts'
import type { WorkItem } from '../types/types.ts'
import { Layout } from '../ui/layout.tsx'
import { render } from '../utils/render.tsx'

export const home: BuildAction<'GET', typeof routes.home> = {
  handler({ request }) {
    return render(<HomePage />, request)
  },
}

function HomePage() {
  return () => (
    <Layout>
      <Hero />
      <Work />
      <Contact />
    </Layout>
  )
}

function Hero() {
  return () => (
    <section
      mix={[
        sectionWrap,
        css({
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.98fr) minmax(300px, 0.92fr)',
          alignItems: 'center',
          gap: '32px',
          padding: '56px 0 40px',
          '@media (max-width: 880px)': {
            gridTemplateColumns: '1fr',
            padding: '30px 0 28px',
          },
        }),
      ]}
    >
      <div
        mix={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          '@media (max-width: 880px)': { alignItems: 'center', textAlign: 'center' },
        })}
      >
        <SectionLabel>{homeContent.hero.eyebrow}</SectionLabel>
        <h1
          mix={css({
            margin: 0,
            maxWidth: '760px',
            fontSize: '78px',
            lineHeight: 0.96,
            fontWeight: theme.fontWeight.bold,
            '@media (max-width: 880px)': { fontSize: '46px' },
          })}
        >
          {homeContent.hero.heading}
        </h1>
        <p
          mix={css({
            margin: 0,
            maxWidth: '620px',
            color: theme.colors.text.secondary,
            fontSize: '21px',
            lineHeight: 1.45,
            '@media (max-width: 880px)': { fontSize: theme.fontSize.lg },
          })}
        >
          {homeContent.hero.body}
        </p>
        <div
          mix={css({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: theme.space.lg,
            paddingTop: theme.space.sm,
            '@media (max-width: 880px)': { justifyContent: 'center' },
          })}
        >
          <PrimaryLink
            href={homeContent.hero.primaryAction.href}
            label={homeContent.hero.primaryAction.label}
          />
          <SecondaryLink
            href={homeContent.hero.secondaryAction.href}
            label={homeContent.hero.secondaryAction.label}
          />
        </div>
      </div>
      <Portrait />
    </section>
  )
}

function Portrait() {
  return () => (
    <div
      aria-label={`${site.portrait.alt} portrait`}
      mix={css({
        alignSelf: 'end',
        justifySelf: 'center',
        width: 'min(100%, 500px)',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '@media (max-width: 880px)': {
          minHeight: '320px',
          maxWidth: '430px',
        },
      })}
    >
      <img
        src={routes.media.href({ path: site.portrait.image })}
        alt={site.portrait.alt}
        mix={css({
          position: 'relative',
          zIndex: 1,
          display: 'block',
          width: 'min(100%, 470px)',
          height: 'auto',
          filter: 'drop-shadow(0 22px 34px rgba(0, 0, 0, 0.48))',
          maskImage:
            'linear-gradient(to bottom, black 0%, black 76%, rgba(0, 0, 0, 0.72) 87%, transparent 100%)',
        })}
      />
    </div>
  )
}

function Work() {
  return () => (
    <section
      id="work"
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

function ProjectCard() {
  return ({ project }: { project: WorkItem }) => (
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
        src={routes.media.href({ path: project.image })}
        alt=""
        style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
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
          <h3 mix={css({ margin: 0, fontSize: '22px', lineHeight: 1.15 })}>{project.name}</h3>
          <p mix={css({ ...bodyCopyStyles, marginTop: theme.space.sm, fontSize: theme.fontSize.md })}>
            {project.description}
          </p>
        </div>
        <TagList values={project.technologies} />
        <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: theme.space.sm })}>
          {project.prodLink ? <TextLink href={project.prodLink} label="Live Site" /> : null}
          {project.repoLink ? <TextLink href={project.repoLink} label="Source" /> : null}
          {project.videoLink ? <TextLink href={project.videoLink} label="Video" /> : null}
        </div>
      </div>
    </article>
  )
}

function Contact() {
  return () => (
    <section
      id="contact"
      mix={[
        sectionWrap,
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.space.xl,
          padding: '52px 0 78px',
          borderTop: `1px solid ${theme.colors.border.subtle}`,
          '@media (max-width: 720px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        }),
      ]}
    >
      <div>
        <SectionLabel>{homeContent.contact.eyebrow}</SectionLabel>
        <h2 mix={sectionHeading}>{homeContent.contact.heading}</h2>
      </div>
      <SecondaryLink href={`mailto:${site.email}`} label={site.email} />
    </section>
  )
}

function SectionLabel() {
  return ({ children }: { children: RemixNode }) => (
    <p
      mix={css({
        margin: '0 0 12px',
        color: portfolio.accentGlow,
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.bold,
        textTransform: 'uppercase',
      })}
    >
      {children}
    </p>
  )
}

function TagList() {
  return ({ values }: { values: string[] }) => (
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
      {values.map((value) => (
        <li
          key={value}
          mix={css({
            minHeight: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            padding: `0 ${theme.space.md}`,
            borderRadius: theme.radius.full,
            border: `1px solid ${theme.colors.border.subtle}`,
            color: theme.colors.text.secondary,
            background: 'rgb(255 255 255 / 0.035)',
            fontSize: theme.fontSize.sm,
          })}
        >
          {value}
        </li>
      ))}
    </ul>
  )
}

function PrimaryLink() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      mix={[
        appLink,
        css({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme.control.height.lg,
          padding: `0 ${theme.space.xl}`,
          borderRadius: theme.radius.lg,
          background: theme.colors.action.primary.background,
          color: theme.colors.action.primary.foreground,
          fontWeight: theme.fontWeight.bold,
          boxShadow: '0 16px 34px rgba(78, 167, 255, 0.24)',
          '&:hover': { background: theme.colors.action.primary.backgroundHover },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      {label}
    </a>
  )
}

function SecondaryLink() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      mix={[
        appLink,
        css({
          maxWidth: '100%',
          overflowWrap: 'anywhere',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme.control.height.lg,
          padding: `0 ${theme.space.xl}`,
          borderRadius: theme.radius.lg,
          border: `1px solid ${theme.colors.action.secondary.border}`,
          color: theme.colors.action.secondary.foreground,
          background: theme.colors.action.secondary.background,
          '&:hover': { borderColor: theme.colors.text.link },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      {label}
    </a>
  )
}

function TextLink() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      mix={[
        appLink,
        css({
          color: theme.colors.text.link,
          fontWeight: theme.fontWeight.semibold,
          '&:hover': { color: theme.colors.action.primary.backgroundHover },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      {label}
    </a>
  )
}

const bodyCopyStyles = {
  margin: 0,
  color: theme.colors.text.secondary,
  fontSize: theme.fontSize.lg,
  lineHeight: theme.lineHeight.relaxed,
}

const sectionHeading = css({
  margin: 0,
  maxWidth: '620px',
  fontSize: '34px',
  lineHeight: 1.12,
  fontWeight: theme.fontWeight.bold,
  '@media (max-width: 560px)': { fontSize: '28px' },
})
