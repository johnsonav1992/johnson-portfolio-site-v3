import { createTheme, RMX_01, theme } from 'remix/ui/theme'

export const Theme = createTheme({
  ...RMX_01.values,
  radius: {
    ...RMX_01.values.radius,
    lg: RMX_01.values.radius.md,
    xl: RMX_01.values.radius.md,
  },
  fontFamily: {
    sans: "Ubuntu, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
  },
  fontSize: {
    ...RMX_01.values.fontSize,
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '23px',
    xxl: '34px',
  },
  lineHeight: {
    ...RMX_01.values.lineHeight,
    tight: '1.1',
    normal: '1.5',
  },
  letterSpacing: {
    ...RMX_01.values.letterSpacing,
    tight: RMX_01.values.letterSpacing.normal,
    meta: RMX_01.values.letterSpacing.normal,
    wide: RMX_01.values.letterSpacing.normal,
  },
  surface: {
    lvl0: '#111217',
    lvl1: '#191b23',
    lvl2: '#20222d',
    lvl3: '#292c38',
    lvl4: '#343846',
  },
  shadow: {
    xs: '0 1px 2px rgb(0 0 0 / 0.18)',
    sm: '0 12px 30px rgb(0 0 0 / 0.28)',
    md: '0 18px 42px rgb(0 0 0 / 0.18)',
    lg: '0 22px 60px rgb(0 0 0 / 0.38)',
    xl: '0 30px 80px rgb(0 0 0 / 0.46)',
  },
  colors: {
    ...RMX_01.values.colors,
    text: {
      primary: '#f6f7fb',
      secondary: '#b7bbc9',
      muted: '#777d91',
      link: '#7cc4ff',
    },
    border: {
      subtle: 'rgb(255 255 255 / 0.11)',
      default: 'rgb(255 255 255 / 0.2)',
      strong: 'rgb(255 255 255 / 0.3)',
    },
    focus: {
      ring: '#9ed8ff',
    },
    overlay: {
      scrim: 'rgb(0 0 0 / 0.58)',
    },
    action: {
      ...RMX_01.values.colors.action,
      primary: {
        background: '#4ea7ff',
        backgroundHover: '#7cc4ff',
        backgroundActive: '#348be0',
        foreground: '#071018',
        border: '#4ea7ff',
      },
      secondary: {
        background: 'rgb(255 255 255 / 0.04)',
        backgroundHover: 'rgb(255 255 255 / 0.07)',
        backgroundActive: 'rgb(255 255 255 / 0.1)',
        foreground: '#f6f7fb',
        border: 'rgb(255 255 255 / 0.2)',
      },
    },
  },
})

export const portfolio = {
  accentGlow: '#83f7b0',
}

export { theme }
