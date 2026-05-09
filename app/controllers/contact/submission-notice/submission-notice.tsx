import { css, type Handle } from 'remix/ui'
import { theme } from '../../../theme/styles.ts'
import type { ContactResult } from '../form.ts'

export const SubmissionNotice = (handle: Handle<{ submission?: ContactResult }>) => {
  return () => {
    const { submission } = handle.props

    if (!submission) {
      return null
    }

    return (
      <div
        role={submission.type === 'error' ? 'alert' : 'status'}
        aria-live='polite'
        mix={css({
          padding: '14px 16px',
          borderRadius: theme.radius.lg,
          border: `1px solid ${
            submission.type === 'error' ? 'rgba(255, 120, 120, 0.4)' : 'rgba(131, 247, 176, 0.38)'
          }`,
          background:
            submission.type === 'error' ? 'rgba(255, 120, 120, 0.09)' : 'rgba(131, 247, 176, 0.12)',
          color: submission.type === 'error' ? '#ffb4b4' : theme.colors.text.primary,
          lineHeight: theme.lineHeight.relaxed,
        })}
      >
        {submission.message}
      </div>
    )
  }
}
