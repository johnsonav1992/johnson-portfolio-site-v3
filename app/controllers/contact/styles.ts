import { css } from 'remix/ui'

import { theme } from '../../theme/styles.ts'

export const cardStyles = css({
  padding: '30px',
  borderRadius: theme.radius.xl,
  border: `1px solid ${theme.colors.border.default}`,
  boxShadow: theme.shadow.sm,
})

export const formFieldStyles = css({
  width: '100%',
  minHeight: theme.control.height.lg,
  padding: '0 16px',
  borderRadius: theme.radius.lg,
  border: `1px solid ${theme.colors.border.default}`,
  background: 'rgba(255, 255, 255, 0.04)',
  color: theme.colors.text.primary,
  font: 'inherit',
  transition: 'border-color 160ms ease, background 160ms ease, box-shadow 160ms ease',
  '&::placeholder': {
    color: theme.colors.text.muted,
  },
  '&:focus': {
    outline: 'none',
    borderColor: theme.colors.focus.ring,
    background: 'rgba(255, 255, 255, 0.06)',
    boxShadow: `0 0 0 3px ${theme.colors.focus.ring}22`,
  },
})

export const inputGroupStyles = css({
  display: 'grid',
  gap: theme.space.sm,
})

export const labelStyles = css({
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.semibold,
})

export const submitButtonStyles = css<HTMLButtonElement>({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: theme.control.height.lg,
  padding: `0 ${theme.space.xl}`,
  border: 'none',
  borderRadius: theme.radius.lg,
  background: theme.colors.action.primary.background,
  color: theme.colors.action.primary.foreground,
  font: 'inherit',
  fontWeight: theme.fontWeight.bold,
  boxShadow: '0 16px 34px rgba(78, 167, 255, 0.24)',
  cursor: 'pointer',
  '&:hover': {
    background: theme.colors.action.primary.backgroundHover,
  },
  '&:disabled': {
    opacity: 0.72,
    cursor: 'progress',
  },
})
