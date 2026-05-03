import { css } from 'remix/ui'

import { portfolio, theme } from './theme.ts'

export const pageShell = css({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.surface.lvl0} 0%, ${theme.surface.lvl1} 48%, ${theme.surface.lvl0} 100%)`,
  color: theme.colors.text.primary,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
})

export const appLink = css({
  color: 'inherit',
  textDecoration: 'none',
})

export const focusRing = {
  outline: `2px solid ${theme.colors.focus.ring}`,
  outlineOffset: theme.space.xs,
}

export const sectionWrap = css({
  width: 'min(1120px, calc(100vw - 40px))',
  margin: '0 auto',
})

export { portfolio, theme }
