import { clientEntry, css, type Handle, on, type SerializableProps } from 'remix/ui'

import { theme } from '../../../theme/styles.ts'
import {
  contactFormAnchorId,
  contactFormFrameName,
  contactFormSectionClientEntry,
  contactFormUrlHeader,
} from '../constants.ts'
import { ContactField } from '../contact-field/contact-field.tsx'
import { contactMessages, contactPageContent } from '../content.ts'
import {
  cardStyles,
  formFieldStyles,
  inputGroupStyles,
  labelStyles,
  submitButtonStyles,
} from '../styles.ts'
import { SubmissionNotice } from '../submission-notice/submission-notice.tsx'
import type { ContactFormValues, ContactResult } from '../types.ts'

interface ContactFormSectionProps extends SerializableProps {
  action: string
  loadedAt: number
  submission?: ContactResult
  values: ContactFormValues
}

const formLayoutStyles = css<HTMLFormElement>({
  display: 'grid',
  gap: '20px',
})

export const ContactFormSection = clientEntry(
  contactFormSectionClientEntry,
  function ContactFormSection(handle: Handle<ContactFormSectionProps>) {
    let isSubmitting = false
    let transportError: ContactResult | undefined

    async function handleSubmit(
      event: SubmitEvent & { currentTarget: HTMLFormElement },
      signal: AbortSignal,
    ) {
      if (isSubmitting) {
        return
      }

      event.preventDefault()
      isSubmitting = true
      transportError = undefined
      void handle.update()

      try {
        const form = event.currentTarget
        const response = await fetch(form.action, {
          body: new FormData(form),
          credentials: 'same-origin',
          headers: {
            accept: 'text/html',
            'x-remix-target': contactFormFrameName,
          },
          method: form.method,
          signal,
        })

        if (signal.aborted) {
          return
        }

        const nextUrl = response.headers.get(contactFormUrlHeader)
        if (nextUrl) {
          window.history.replaceState(window.history.state, '', nextUrl)
        }

        await handle.frame.replace(response.body ?? (await response.text()))
      } catch (error) {
        if (signal.aborted) {
          return
        }

        console.error('Contact form submission failed:', error)
        transportError = {
          type: 'error',
          message: contactMessages.genericError,
        }
      } finally {
        if (!signal.aborted) {
          isSubmitting = false
          void handle.update()
        }
      }
    }

    return () => {
      const { action, loadedAt, submission, values } = handle.props

      return (
        <section
          id={contactFormAnchorId}
          mix={[
            cardStyles,
            css({
              display: 'grid',
              gap: theme.space.lg,
              padding: '34px',
              scrollMarginTop: '104px',
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
            data-contact-form
            method='POST'
            mix={[formLayoutStyles, on('submit', handleSubmit)]}
          >
            <SubmissionNotice submission={transportError ?? submission} />
            <ContactField
              id='contact-name'
              name='name'
              label={contactPageContent.nameLabel}
              placeholder={contactPageContent.namePlaceholder}
              defaultValue={values.name}
            />
            <ContactField
              id='contact-email'
              name='email'
              type='email'
              label={contactPageContent.emailLabel}
              placeholder={contactPageContent.emailPlaceholder}
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
                placeholder={contactPageContent.messagePlaceholder}
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
              mix={submitButtonStyles}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : contactPageContent.submitLabel}
            </button>
          </form>
        </section>
      )
    }
  },
)
