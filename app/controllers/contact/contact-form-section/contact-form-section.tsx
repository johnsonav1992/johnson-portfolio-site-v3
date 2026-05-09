import { css } from 'remix/ui'

import { contactPageContent } from '../../../data/site.ts'
import { theme } from '../../../theme/styles.ts'
import { ContactField } from '../contact-field/contact-field.tsx'
import type { ContactFormValues, ContactResult } from '../form.ts'
import { cardStyles, formFieldStyles, inputGroupStyles, labelStyles } from '../styles.ts'
import { SubmissionNotice } from '../submission-notice/submission-notice.tsx'

interface ContactFormSectionProps {
  action: string
  loadedAt: number
  submission?: ContactResult
  values: ContactFormValues
}

export const ContactFormSection = () => {
  return ({ action, loadedAt, submission, values }: ContactFormSectionProps) => (
    <section
      mix={[
        cardStyles,
        css({
          display: 'grid',
          gap: theme.space.lg,
          padding: '34px',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025))',
          boxShadow: theme.shadow.lg,
          '@media (max-width: 620px)': {
            padding: '24px',
          },
        }),
      ]}
    >
      <div
        mix={css({
          display: 'grid',
          gap: theme.space.md,
        })}
      >
        <h2
          mix={css({
            margin: 0,
            fontSize: '34px',
            lineHeight: 1.08,
            '@media (max-width: 620px)': {
              fontSize: '28px',
            },
          })}
        >
          {contactPageContent.formHeading}
        </h2>
        <p
          mix={css({
            margin: 0,
            color: theme.colors.text.secondary,
            lineHeight: theme.lineHeight.relaxed,
          })}
        >
          {contactPageContent.formBody}
        </p>
      </div>
      <form
        action={action}
        method='POST'
        mix={css({
          display: 'grid',
          gap: '20px',
        })}
      >
        <SubmissionNotice submission={submission} />
        <ContactField
          id='contact-name'
          name='name'
          label={contactPageContent.nameLabel}
          placeholder='Your name'
          defaultValue={values.name}
        />
        <ContactField
          id='contact-email'
          name='email'
          type='email'
          label={contactPageContent.emailLabel}
          placeholder='you@example.com'
          defaultValue={values.email}
        />
        <div mix={inputGroupStyles}>
          <label
            htmlFor='contact-message'
            mix={labelStyles}
          >
            {contactPageContent.messageLabel}
          </label>
          <textarea
            id='contact-message'
            mix={[
              formFieldStyles,
              css({
                minHeight: '220px',
                padding: '14px 16px',
                resize: 'vertical',
              }),
            ]}
            name='message'
            rows={9}
            placeholder='Tell me a bit about the project, timeline, or what you need help with.'
            defaultValue={values.message}
            required
          />
        </div>
        <input
          type='hidden'
          name='loadedAt'
          value={loadedAt.toString()}
        />
        <input
          type='text'
          name='honeypot'
          tabIndex={-1}
          autoComplete='off'
          mix={css({
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
          })}
        />
        <button
          type='submit'
          mix={css({
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
          })}
        >
          {contactPageContent.submitLabel}
        </button>
      </form>
    </section>
  )
}
