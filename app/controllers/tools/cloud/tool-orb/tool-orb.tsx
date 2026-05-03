import { clientEntry, css, type Handle, on } from 'remix/ui'
import { animateEntrance, spring } from 'remix/ui/animation'

import { mediaPath } from '../../../../data/media.ts'
import { focusRing, theme } from '../../../../theme/styles.ts'

interface ToolOrbProps {
  [key: string]: number | string | undefined
  glow: string
  image?: string
  monogram?: string
  name: string
  size: number
  tilt: number
  x: number
  y: number
}

export const ToolOrb = clientEntry<ToolOrbProps>(
  `${import.meta.url}#ToolOrb`,
  (handle: Handle<ToolOrbProps>) => {
    let isActive = false

    const canHover = () =>
      globalThis.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false

    return () => {
      const { glow, image, monogram, name, size, tilt, x, y } = handle.props

      return (
        <button
          type='button'
          aria-label={name}
          data-active={isActive ? 'true' : undefined}
          style={{
            '--tool-mobile-size': '96px',
            '--tool-size': `${size}px`,
            '--tool-tilt': `${tilt}deg`,
            '--tool-transform-active':
              'translate(var(--tool-x), var(--tool-y)) rotate(0deg) scale(1.44)',
            '--tool-transform-rest':
              'translate(var(--tool-x), var(--tool-y)) rotate(var(--tool-tilt)) scale(1)',
            '--tool-x': `${x}px`,
            '--tool-y': `${y}px`,
            '--tool-glow': glow,
          }}
          mix={[
            css({
              width: 'var(--tool-size)',
              height: 'calc(var(--tool-size) + 44px)',
              padding: 0,
              display: 'grid',
              placeItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: 'calc(var(--tool-size) / -2)',
              marginTop: 'calc((var(--tool-size) + 36px) / -2)',
              isolation: 'isolate',
              overflow: 'visible',
              zIndex: 1,
              transform: 'var(--tool-transform-rest)',
              transition: spring.transition(['transform', 'filter'], 'bouncy'),
              outline: 'none',
              border: 0,
              color: 'inherit',
              cursor: 'pointer',
              background: 'transparent',
              filter: 'none',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: '8px 2px 34px',
                zIndex: -1,
                borderRadius: theme.radius.full,
                background:
                  'radial-gradient(circle, color-mix(in srgb, var(--tool-glow), white 12%), transparent 66%)',
                filter: 'blur(22px)',
                opacity: 0.22,
                transform: 'scale(1)',
                transition: spring.transition(['opacity', 'transform'], 'smooth'),
              },
              '& .tool-label': {
                opacity: 0,
                visibility: 'hidden',
                transform: 'translateX(-50%) translateY(-6px)',
              },
              '&:focus-visible': {
                outline: focusRing.outline,
                outlineOffset: focusRing.outlineOffset,
              },
              '&:focus-visible, &[data-active="true"]': {
                zIndex: 6,
                transform: 'var(--tool-transform-active)',
                filter: 'drop-shadow(0 22px 32px rgb(0 0 0 / 0.4))',
              },
              '&:focus-visible::before, &[data-active="true"]::before': {
                opacity: 0.9,
                transform: 'scale(1.08)',
              },
              '&:focus-visible .tool-surface, &[data-active="true"] .tool-surface': {
                background: 'color-mix(in srgb, var(--tool-glow) 10%, rgb(255 255 255 / 0.08))',
                borderColor: 'color-mix(in srgb, var(--tool-glow), white 20%)',
                boxShadow:
                  'inset 0 1px 0 rgb(255 255 255 / 0.16), 0 22px 42px color-mix(in srgb, var(--tool-glow), rgb(0 0 0 / 0.65) 70%)',
              },
              '&:focus-visible .tool-icon, &[data-active="true"] .tool-icon': {
                filter:
                  'drop-shadow(0 10px 20px color-mix(in srgb, var(--tool-glow), rgb(0 0 0 / 0.6) 60%))',
                transform: 'scale(1.08)',
              },
              '&:focus-visible .tool-label, &[data-active="true"] .tool-label': {
                opacity: 1,
                visibility: 'visible',
                transform: 'translateX(-50%) translateY(0)',
              },
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  zIndex: 6,
                  transform: 'var(--tool-transform-active)',
                  filter: 'drop-shadow(0 22px 32px rgb(0 0 0 / 0.4))',
                },
                '&:hover::before': {
                  opacity: 0.9,
                  transform: 'scale(1.08)',
                },
                '&:hover .tool-surface': {
                  background: 'color-mix(in srgb, var(--tool-glow) 10%, rgb(255 255 255 / 0.08))',
                  borderColor: 'color-mix(in srgb, var(--tool-glow), white 20%)',
                  boxShadow:
                    'inset 0 1px 0 rgb(255 255 255 / 0.16), 0 22px 42px color-mix(in srgb, var(--tool-glow), rgb(0 0 0 / 0.65) 70%)',
                },
                '&:hover .tool-icon': {
                  filter:
                    'drop-shadow(0 10px 20px color-mix(in srgb, var(--tool-glow), rgb(0 0 0 / 0.6) 60%))',
                  transform: 'scale(1.08)',
                },
                '&:hover .tool-label': {
                  opacity: 1,
                  visibility: 'visible',
                  transform: 'translateX(-50%) translateY(0)',
                },
              },
              '@media (max-width: 620px)': {
                width: 'var(--tool-mobile-size)',
                height: 'calc(var(--tool-mobile-size) + 38px)',
                position: 'relative',
                top: 'auto',
                left: 'auto',
                margin: 0,
                transform: 'none',
                '&:focus-visible, &[data-active="true"]': {
                  transform: 'scale(1.2)',
                },
              },
              '@media (max-width: 620px) and (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              },
            }),
            on('click', () => {
              if (canHover()) return

              isActive = !isActive
              handle.update()
            }),
            on('blur', () => {
              if (!isActive) return

              isActive = false
              handle.update()
            }),
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
              transition: spring.transition(['background', 'border-color', 'box-shadow'], 'smooth'),
              '@media (max-width: 620px)': {
                width: 'calc(var(--tool-mobile-size) * 0.78)',
                height: 'calc(var(--tool-mobile-size) * 0.78)',
              },
            })}
          >
            {image ? (
              <img
                class='tool-icon'
                src={mediaPath(image)}
                alt=''
                mix={css({
                  width: '62%',
                  height: '62%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 16px rgb(0 0 0 / 0.34))',
                  transform: 'scale(1)',
                  transition: spring.transition(['transform', 'filter'], 'smooth'),
                })}
              />
            ) : (
              <span
                class='tool-icon'
                aria-hidden='true'
                mix={css({
                  color: 'var(--tool-glow)',
                  fontSize: 'calc(var(--tool-size) * 0.28)',
                  fontWeight: theme.fontWeight.bold,
                  fontFamily: theme.fontFamily.mono,
                  filter: 'drop-shadow(0 8px 16px rgb(0 0 0 / 0.34))',
                  transform: 'scale(1)',
                  transition: spring.transition(['transform', 'filter'], 'smooth'),
                })}
              >
                {monogram}
              </span>
            )}
          </div>
          <span
            class='tool-label'
            mix={css({
              minHeight: '22px',
              position: 'absolute',
              left: '50%',
              bottom: 0,
              zIndex: 5,
              padding: '4px 10px',
              borderRadius: theme.radius.full,
              border: `1px solid ${theme.colors.border.subtle}`,
              background: 'rgb(17 18 23 / 0.94)',
              color: theme.colors.text.primary,
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.semibold,
              boxShadow: '0 12px 24px rgb(0 0 0 / 0.28)',
              pointerEvents: 'none',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              transition: spring.transition(['opacity', 'transform'], 'snappy'),
            })}
          >
            {name}
          </span>
        </button>
      )
    }
  },
)
