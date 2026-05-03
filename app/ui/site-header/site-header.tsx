import { css } from 'remix/ui'

import { mediaPath } from '../../data/media.ts'
import { navigation, site } from '../../data/site.ts'
import { routes } from '../../routes.ts'
import { appLink, focusRing, sectionWrap, theme } from '../../theme/styles.ts'
import { NavItem } from './nav-item/nav-item.tsx'

export const SiteHeader = () => {
  return () => (
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
        aria-label='Main navigation'
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
          aria-label={site.name}
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
            src={mediaPath(site.logo.image)}
            alt={site.logo.alt}
            mix={css({
              width: '42px',
              height: '42px',
              borderRadius: theme.radius.lg,
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
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}
        </div>
      </nav>
    </header>
  )
}
