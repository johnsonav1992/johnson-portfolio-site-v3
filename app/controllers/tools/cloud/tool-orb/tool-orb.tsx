import { css, on } from 'remix/ui'
import { animateEntrance, spring } from 'remix/ui/animation'

import { mediaPath } from '../../../../data/media.ts'
import { focusRing, theme } from '../../../../theme/styles.ts'
import type { ToolCategory, ToolItem } from '../../../../types/types.ts'

export interface ToolOrbProps {
  onSelectCategory?: (category: ToolCategory) => void
  persistentLabel?: boolean
  size: number
  subdued?: boolean
  tool: ToolItem
  x: number
  y: number
}

export const ToolOrb = () => {
  return ({
    onSelectCategory,
    persistentLabel = false,
    size,
    subdued = false,
    tool,
    x,
    y,
  }: ToolOrbProps) => (
    <button
      type='button'
      aria-label={tool.name}
      style={
        {
          '--tool-opacity': subdued ? '0.22' : '1',
          '--tool-scale': subdued ? '0.9' : '1',
          '--tool-size': `${size}px`,
          '--tool-x': `${x}px`,
          '--tool-y': `${y}px`,
          '--tool-tilt': `${tool.tilt}deg`,
          '--tool-glow': tool.glow,
        } as Record<string, string>
      }
      mix={[
        css({
          width: 'var(--tool-size)',
          height: 'calc(var(--tool-size) + 36px)',
          padding: 0,
          display: 'grid',
          placeItems: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: 'calc(var(--tool-size) / -2)',
          marginTop: 'calc((var(--tool-size) + 36px) / -2)',
          isolation: 'isolate',
          opacity: 'var(--tool-opacity)',
          transform:
            'translate(var(--tool-x), var(--tool-y)) rotate(var(--tool-tilt)) scale(var(--tool-scale))',
          transition: spring.transition(['transform', 'filter', 'opacity'], 'bouncy'),
          outline: 'none',
          border: 0,
          color: 'inherit',
          cursor: 'pointer',
          background: 'transparent',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '10px 4px 34px',
            zIndex: -1,
            borderRadius: theme.radius.full,
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--tool-glow), transparent 30%), transparent 68%)',
            filter: 'blur(18px)',
            opacity: 0.28,
            transition: spring.transition('opacity', 'smooth'),
          },
          '&:hover, &:focus-visible': {
            zIndex: 4,
            transform: 'translate(var(--tool-x), var(--tool-y)) rotate(0deg) scale(1.38)',
            filter: 'drop-shadow(0 18px 28px rgb(0 0 0 / 0.34))',
            opacity: 1,
          },
          '&:hover::before, &:focus-visible::before': {
            opacity: 0.72,
          },
          '&:focus-visible': focusRing,
          '&:hover .tool-label, &:focus-visible .tool-label': {
            opacity: 1,
            transform: 'translateX(-50%) translateY(0)',
          },
          '&:hover .tool-surface, &:focus-visible .tool-surface': {
            borderColor: 'color-mix(in srgb, var(--tool-glow), white 20%)',
            background: 'rgb(255 255 255 / 0.09)',
          },
          '@media (max-width: 620px)': {
            width: 'calc(var(--tool-size) * 0.82)',
            height: 'calc((var(--tool-size) * 0.82) + 32px)',
            position: 'relative',
            top: 'auto',
            left: 'auto',
            margin: 0,
            transform: 'none',
            opacity: 'var(--tool-opacity)',
            '&:hover, &:focus-visible': {
              transform: 'scale(1.2)',
            },
          },
        }),
        on('click', () => onSelectCategory?.(tool.category)),
        animateEntrance({
          opacity: 0,
          transform: 'translateY(20px) scale(0.92)',
          ...spring('smooth'),
        }),
      ]}
    >
      <div
        class='tool-surface'
        mix={css({
          width: 'calc(var(--tool-size) * 0.78)',
          height: 'calc(var(--tool-size) * 0.78)',
          display: 'grid',
          placeItems: 'center',
          borderRadius: theme.radius.full,
          border: `1px solid ${theme.colors.border.subtle}`,
          background: 'rgb(255 255 255 / 0.055)',
          boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.1), 0 18px 34px rgb(0 0 0 / 0.18)',
          transition: spring.transition(['background', 'border-color'], 'smooth'),
          '@media (max-width: 620px)': {
            width: 'calc(var(--tool-size) * 0.78)',
            height: 'calc(var(--tool-size) * 0.78)',
          },
        })}
      >
        {tool.image ? (
          <img
            src={mediaPath(tool.image)}
            alt=''
            mix={css({
              width: '62%',
              height: '62%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgb(0 0 0 / 0.34))',
            })}
          />
        ) : (
          <span
            aria-hidden='true'
            mix={css({
              color: 'var(--tool-glow)',
              fontSize: 'calc(var(--tool-size) * 0.28)',
              fontWeight: theme.fontWeight.bold,
              fontFamily: theme.fontFamily.mono,
            })}
          >
            {tool.monogram}
          </span>
        )}
      </div>
      <span
        class='tool-label'
        style={
          persistentLabel
            ? {
                opacity: 1,
                transform: 'translateX(-50%)',
              }
            : undefined
        }
        mix={css({
          minHeight: '22px',
          position: 'absolute',
          left: '50%',
          bottom: 0,
          zIndex: 5,
          padding: '3px 8px',
          borderRadius: theme.radius.full,
          border: `1px solid ${theme.colors.border.subtle}`,
          background: 'rgb(17 18 23 / 0.86)',
          color: theme.colors.text.primary,
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.semibold,
          opacity: 0,
          transform: 'translateX(-50%) translateY(-4px)',
          transition: spring.transition(['opacity', 'transform'], 'snappy'),
          textAlign: 'center',
          whiteSpace: 'nowrap',
          '@media (hover: none)': {
            opacity: 1,
            transform: 'translateX(-50%)',
          },
        })}
      >
        {tool.name}
      </span>
    </button>
  )
}
