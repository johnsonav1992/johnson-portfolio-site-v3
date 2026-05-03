import { css } from 'remix/ui'

import { theme } from '../../../theme/styles.ts'

export const bodyCopyStyles = {
  margin: 0,
  color: theme.colors.text.secondary,
  fontSize: theme.fontSize.lg,
  lineHeight: theme.lineHeight.relaxed,
}

export const sectionHeading = css({
  margin: 0,
  maxWidth: '620px',
  fontSize: '34px',
  lineHeight: 1.12,
  fontWeight: theme.fontWeight.bold,
  '@media (max-width: 560px)': { fontSize: '28px' },
})
