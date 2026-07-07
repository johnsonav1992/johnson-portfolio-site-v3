import type { Handle } from 'remix/ui'

type ThemeStyleProps = {
  nonce?: string
}

type ThemeContract<Source> = {
  [Key in keyof Source]: Source[Key] extends string
    ? string
    : Source[Key] extends Record<string, unknown>
      ? ThemeContract<Source[Key]>
      : never
}

const themeVariableNames = {
  space: {
    none: '--rmx-space-none',
    px: '--rmx-space-px',
    xs: '--rmx-space-xs',
    sm: '--rmx-space-sm',
    md: '--rmx-space-md',
    lg: '--rmx-space-lg',
    xl: '--rmx-space-xl',
    xxl: '--rmx-space-xxl',
  },
  radius: {
    none: '--rmx-radius-none',
    sm: '--rmx-radius-sm',
    md: '--rmx-radius-md',
    lg: '--rmx-radius-lg',
    xl: '--rmx-radius-xl',
    full: '--rmx-radius-full',
  },
  fontFamily: {
    sans: '--rmx-font-family-sans',
    mono: '--rmx-font-family-mono',
  },
  fontSize: {
    xxxs: '--rmx-font-size-xxxs',
    xxs: '--rmx-font-size-xxs',
    xs: '--rmx-font-size-xs',
    sm: '--rmx-font-size-sm',
    md: '--rmx-font-size-md',
    lg: '--rmx-font-size-lg',
    xl: '--rmx-font-size-xl',
    xxl: '--rmx-font-size-xxl',
  },
  lineHeight: {
    tight: '--rmx-line-height-tight',
    normal: '--rmx-line-height-normal',
    relaxed: '--rmx-line-height-relaxed',
  },
  letterSpacing: {
    tight: '--rmx-letter-spacing-tight',
    normal: '--rmx-letter-spacing-normal',
    meta: '--rmx-letter-spacing-meta',
    wide: '--rmx-letter-spacing-wide',
  },
  fontWeight: {
    normal: '--rmx-font-weight-normal',
    medium: '--rmx-font-weight-medium',
    semibold: '--rmx-font-weight-semibold',
    bold: '--rmx-font-weight-bold',
  },
  control: {
    height: {
      sm: '--rmx-control-height-sm',
      md: '--rmx-control-height-md',
      lg: '--rmx-control-height-lg',
    },
  },
  surface: {
    lvl0: '--rmx-surface-lvl0',
    lvl1: '--rmx-surface-lvl1',
    lvl2: '--rmx-surface-lvl2',
    lvl3: '--rmx-surface-lvl3',
    lvl4: '--rmx-surface-lvl4',
  },
  shadow: {
    xs: '--rmx-shadow-xs',
    sm: '--rmx-shadow-sm',
    md: '--rmx-shadow-md',
    lg: '--rmx-shadow-lg',
    xl: '--rmx-shadow-xl',
  },
  colors: {
    text: {
      primary: '--rmx-color-text-primary',
      secondary: '--rmx-color-text-secondary',
      muted: '--rmx-color-text-muted',
      link: '--rmx-color-text-link',
    },
    border: {
      subtle: '--rmx-color-border-subtle',
      default: '--rmx-color-border-default',
      strong: '--rmx-color-border-strong',
    },
    focus: {
      ring: '--rmx-color-focus-ring',
    },
    overlay: {
      scrim: '--rmx-color-overlay-scrim',
    },
    action: {
      primary: {
        background: '--rmx-color-action-primary-background',
        backgroundHover: '--rmx-color-action-primary-background-hover',
        backgroundActive: '--rmx-color-action-primary-background-active',
        foreground: '--rmx-color-action-primary-foreground',
        border: '--rmx-color-action-primary-border',
      },
      secondary: {
        background: '--rmx-color-action-secondary-background',
        backgroundHover: '--rmx-color-action-secondary-background-hover',
        backgroundActive: '--rmx-color-action-secondary-background-active',
        foreground: '--rmx-color-action-secondary-foreground',
        border: '--rmx-color-action-secondary-border',
      },
      danger: {
        background: '--rmx-color-action-danger-background',
        backgroundHover: '--rmx-color-action-danger-background-hover',
        backgroundActive: '--rmx-color-action-danger-background-active',
        foreground: '--rmx-color-action-danger-foreground',
        border: '--rmx-color-action-danger-border',
      },
    },
  },
} as const

export const theme = mapThemeLeaves(themeVariableNames, (variableName) => `var(${variableName})`)

export const themeValues = {
  space: {
    none: '0px',
    px: '1px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  radius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '8px',
    xl: '8px',
    full: '9999px',
  },
  fontFamily: {
    sans: "Ubuntu, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
  },
  fontSize: {
    xxxs: '10px',
    xxs: '11px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '23px',
    xxl: '34px',
  },
  lineHeight: {
    tight: '1.1',
    normal: '1.5',
    relaxed: '1.65',
  },
  letterSpacing: {
    tight: '0',
    normal: '0',
    meta: '0',
    wide: '0',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  control: {
    height: {
      sm: '28px',
      md: '32px',
      lg: '36px',
    },
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
      danger: {
        background: '#FF3000',
        backgroundHover: '#e12b00',
        backgroundActive: '#c52600',
        foreground: 'rgb(255 255 255 / 0.92)',
        border: '#FF3000',
      },
    },
  },
} as const

const themeVars = collectThemeVars(themeVariableNames, themeValues)
const themeCssText = serializeThemeCss(':root', themeVars)

export const Theme = (handle: Handle<ThemeStyleProps>) => {
  return () => (
    <style
      nonce={handle.props.nonce}
      data-rmx-theme=''
      data-rmx-theme-selector=':root'
    >
      {themeCssText}
    </style>
  )
}

export const portfolio = {
  accentGlow: '#83f7b0',
}

function collectThemeVars(
  tree: Record<string, unknown>,
  values: Record<string, unknown>,
): Record<string, string> {
  const vars: Record<string, string> = {}

  for (const [key, value] of Object.entries(tree)) {
    const themeValue = values[key]

    if (typeof value === 'string') {
      vars[value] = String(themeValue)
      continue
    }

    Object.assign(
      vars,
      collectThemeVars(value as Record<string, unknown>, themeValue as Record<string, unknown>),
    )
  }

  return vars
}

function serializeThemeCss(selector: string, vars: Record<string, string>): string {
  const lines = Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')

  return [
    `${selector} {\n${lines}\n}`,
    '@layer rmx-reset, rmx;',
    `@layer rmx-reset { ${serializeThemeResetCss(selector)} }`,
  ].join('\n\n')
}

function serializeThemeResetCss(selector: string): string {
  const fontFamily = theme.fontFamily.sans
  const fontSize = theme.fontSize.md
  const lineHeight = theme.lineHeight.normal
  const textColor = theme.colors.text.primary
  const backgroundColor = theme.surface.lvl0

  if (selector === ':root') {
    return [
      `*, *::before, *::after {\n  box-sizing: border-box;\n}`,
      `html, body {\n  margin: 0;\n}`,
      `body {\n  font-family: ${fontFamily};\n  font-size: ${fontSize};\n  line-height: ${lineHeight};\n  color: ${textColor};\n  background-color: ${backgroundColor};\n}`,
      `:where(h1, h2, h3, h4, h5, h6, p, ul, ol, dl, figure, blockquote) {\n  margin: 0;\n}`,
      `:where(img, svg) {\n  display: block;\n}`,
    ].join('\n\n')
  }

  return [
    `${selector}, ${selector} *, ${selector} *::before, ${selector} *::after {\n  box-sizing: border-box;\n}`,
    `${selector} {\n  font-family: ${fontFamily};\n  font-size: ${fontSize};\n  line-height: ${lineHeight};\n  color: ${textColor};\n  background-color: ${backgroundColor};\n}`,
    `${selector} :where(h1, h2, h3, h4, h5, h6, p, ul, ol, dl, figure, blockquote) {\n  margin: 0;\n}`,
    `${selector} :where(img, svg) {\n  display: block;\n}`,
  ].join('\n\n')
}

function mapThemeLeaves<tree extends Record<string, unknown>>(
  tree: tree,
  mapLeaf: (value: string) => string,
): ThemeContract<tree> {
  const output: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(tree)) {
    output[key] =
      typeof value === 'string'
        ? mapLeaf(value)
        : mapThemeLeaves(value as Record<string, unknown>, mapLeaf)
  }

  return output as ThemeContract<tree>
}
