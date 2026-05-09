import { css } from 'remix/ui'

import { notFoundContent } from '../../data/site.ts'
import { appLink, focusRing, sectionWrap, theme } from '../../theme/styles.ts'
import { Layout } from '../../ui/layout.tsx'
import { SectionLabel } from '../../ui/section-label/section-label.tsx'

const actionLink = ({ variant }: { variant: 'primary' | 'secondary' }) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.control.height.lg,
    padding: `0 ${theme.space.xl}`,
    borderRadius: theme.radius.lg,
    fontWeight: variant === 'primary' ? theme.fontWeight.bold : theme.fontWeight.medium,
    background:
      variant === 'primary'
        ? theme.colors.action.primary.background
        : theme.colors.action.secondary.background,
    color:
      variant === 'primary'
        ? theme.colors.action.primary.foreground
        : theme.colors.action.secondary.foreground,
    border:
      variant === 'primary'
        ? '1px solid transparent'
        : `1px solid ${theme.colors.action.secondary.border}`,
    boxShadow: variant === 'primary' ? '0 16px 34px rgba(78, 167, 255, 0.24)' : undefined,
    '&:hover': {
      background:
        variant === 'primary'
          ? theme.colors.action.primary.backgroundHover
          : theme.colors.action.secondary.background,
      borderColor: variant === 'primary' ? 'transparent' : theme.colors.text.link,
    },
    '&:focus-visible': focusRing,
  })

export const NotFoundPage = () => {
  return () => (
    <Layout title={notFoundContent.title}>
      <section
        mix={[
          sectionWrap,
          css({
            minHeight: 'min(620px, calc(100vh - 220px))',
            display: 'grid',
            alignItems: 'center',
            padding: '72px 0 96px',
            '@media (max-width: 720px)': {
              minHeight: 'auto',
              padding: '56px 0 72px',
            },
          }),
        ]}
      >
        <div
          mix={css({
            width: '100%',
            maxWidth: '720px',
            display: 'grid',
            gap: '22px',
          })}
        >
          <SectionLabel>{notFoundContent.eyebrow}</SectionLabel>
          <h1
            mix={css({
              margin: 0,
              fontSize: '64px',
              lineHeight: 1,
              fontWeight: theme.fontWeight.bold,
              '@media (max-width: 720px)': { fontSize: '44px' },
            })}
          >
            {notFoundContent.heading}
          </h1>
          <p
            mix={css({
              margin: 0,
              maxWidth: '620px',
              color: theme.colors.text.secondary,
              fontSize: theme.fontSize.lg,
              lineHeight: 1.6,
            })}
          >
            {notFoundContent.body}
          </p>
          <div
            mix={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.space.lg,
              paddingTop: theme.space.md,
            })}
          >
            <a
              href={notFoundContent.primaryAction.href}
              mix={[appLink, actionLink({ variant: 'primary' })]}
            >
              {notFoundContent.primaryAction.label}
            </a>
            <a
              href={notFoundContent.secondaryAction.href}
              mix={[appLink, actionLink({ variant: 'secondary' })]}
            >
              {notFoundContent.secondaryAction.label}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
