import { css } from 'remix/ui'
import type { RemixNode } from 'remix/ui'

import { navigation, site, socials } from '../data/site.ts'
import { routes } from '../routes.ts'
import { appLink, focusRing, portfolio, sectionWrap, theme } from '../theme/styles.ts'
import { Document } from './document.tsx'

export interface LayoutProps {
  children?: RemixNode
  title?: string
}

export function Layout() {
  return ({ title, children }: LayoutProps) => (
    <Document title={title}>
      <div
        mix={css({
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            background:
              `linear-gradient(90deg, rgba(78, 167, 255, 0.09), transparent 34%, ${portfolio.accentGlow}14 72%, transparent)`,
            maskImage: 'linear-gradient(to bottom, black, transparent 76%)',
          },
        })}
      >
        <header
          mix={css({
            position: 'sticky',
            top: 0,
            zIndex: 10,
            borderBottom: `1px solid ${theme.colors.border.subtle}`,
            background: 'rgba(17, 18, 23, 0.82)',
            backdropFilter: 'blur(18px)',
          })}
        >
          <nav
            aria-label="Main navigation"
            mix={[
              sectionWrap,
              css({
                minHeight: '76px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
              }),
            ]}
          >
            <a
              href={routes.home.href()}
              aria-label={`${site.name} home`}
              mix={[
                appLink,
                css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: 0,
                  '&:focus-visible': focusRing,
                }),
              ]}
            >
              <img
                aria-hidden="true"
                src={routes.media.href({ path: site.logo.image })}
                alt=""
                mix={css({
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  display: 'block',
                  objectFit: 'cover',
                  background: theme.surface.lvl3,
                  border: `1px solid ${theme.colors.border.default}`,
                  boxShadow: theme.shadow.sm,
                })}
              />
            </a>
            <div
              mix={css({
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: theme.colors.text.secondary,
                fontSize: '14px',
                '@media (max-width: 560px)': { gap: '2px' },
              })}
            >
              {navigation.map((item) => (
                <NavItem key={item.href} href={item.href} label={item.label} />
              ))}
            </div>
          </nav>
        </header>
        <main mix={css({ position: 'relative', zIndex: 1, flex: '1 0 auto' })}>{children}</main>
        <footer
          mix={[
            sectionWrap,
            css({
              position: 'relative',
              zIndex: 1,
              minHeight: '82px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              color: theme.colors.text.secondary,
              fontSize: '14px',
              borderTop: `1px solid ${theme.colors.border.subtle}`,
              '@media (max-width: 620px)': {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '18px 0',
              },
            }),
          ]}
        >
          <span>{`© ${new Date().getFullYear()} ${site.businessName}`}</span>
          <div mix={css({ display: 'flex', alignItems: 'center', gap: '16px' })}>
            {socials.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </footer>
      </div>
    </Document>
  )
}

function NavItem() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      mix={[
        appLink,
        css({
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '40px',
          padding: '0 12px',
          borderRadius: '8px',
          transition: 'color 160ms ease, background 160ms ease',
          '&:hover': {
            color: theme.colors.text.primary,
            background: 'rgba(255, 255, 255, 0.06)',
          },
          '&:focus-visible': focusRing,
          '@media (max-width: 560px)': { padding: '0 8px' },
        }),
      ]}
    >
      {label}
    </a>
  )
}

function FooterLink() {
  return ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      mix={[
        appLink,
        css({
          color: theme.colors.text.primary,
          transition: 'color 160ms ease',
          '&:hover': { color: theme.colors.text.link },
          '&:focus-visible': focusRing,
        }),
      ]}
    >
      {label}
    </a>
  )
}
