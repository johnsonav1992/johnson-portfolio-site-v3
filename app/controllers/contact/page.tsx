import { css } from 'remix/ui'

import { routes } from '../../routes.ts'
import { contactPageContent, site, socials } from '../../data/site.ts'
import { sectionWrap, theme } from '../../theme/styles.ts'
import { Layout } from '../../ui/layout.tsx'
import { FooterLink } from '../../ui/site-footer/footer-link/footer-link.tsx'
import type { ContactFormValues, ContactResult } from '../../utils/contact.ts'
import { SectionLabel } from '../home/components/section-label/section-label.tsx'

const formAction = routes.contact.action.href()

const cardStyles = css({
  padding: '30px',
  borderRadius: theme.radius.xl,
  border: `1px solid ${theme.colors.border.default}`,
  boxShadow: theme.shadow.sm,
})

const formFieldStyles = css({
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

const inputGroupStyles = css({
  display: 'grid',
  gap: theme.space.sm,
})

const labelStyles = css({
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.semibold,
})

const emptyFormValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

export interface ContactPageProps {
  loadedAt: number
  submission?: ContactResult
  values?: ContactFormValues
}

interface ContactFieldProps {
  defaultValue: string
  id: string
  label: string
  name: string
  placeholder: string
  type?: 'email' | 'text'
}

const renderSubmissionNotice = (submission?: ContactResult) => {
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
          submission.type === 'error'
            ? 'rgba(255, 120, 120, 0.4)'
            : 'rgba(131, 247, 176, 0.38)'
        }`,
        background:
          submission.type === 'error'
            ? 'rgba(255, 120, 120, 0.09)'
            : 'rgba(131, 247, 176, 0.12)',
        color: submission.type === 'error' ? '#ffb4b4' : theme.colors.text.primary,
        lineHeight: theme.lineHeight.relaxed,
      })}
    >
      {submission.message}
    </div>
  )
}

const ContactField = () => {
  return ({ defaultValue, id, label, name, placeholder, type = 'text' }: ContactFieldProps) => (
    <div mix={inputGroupStyles}>
      <label
        htmlFor={id}
        mix={labelStyles}
      >
        {label}
      </label>
      <input
        id={id}
        mix={formFieldStyles}
        type={type}
        list={undefined}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
      />
    </div>
  )
}

export const ContactPage = () => {
  return ({ loadedAt, submission, values = emptyFormValues }: ContactPageProps) => (
    <Layout
      currentPath='/contact'
      title={contactPageContent.title}
    >
      <section
        mix={[
          sectionWrap,
          css({
            display: 'grid',
            padding: '64px 0 80px',
            '@media (max-width: 720px)': {
              padding: '48px 0 64px',
            },
          }),
        ]}
      >
        <div
          mix={css({
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(320px, 0.95fr)',
            gap: '24px',
            alignItems: 'start',
            '@media (max-width: 920px)': {
              gridTemplateColumns: '1fr',
            },
          })}
        >
          <div
            mix={css({
              display: 'grid',
              gap: '20px',
            })}
          >
            <SectionLabel>{contactPageContent.eyebrow}</SectionLabel>

            <section
              mix={[
                cardStyles,
                css({
                  display: 'grid',
                  gap: '24px',
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03))',
                }),
              ]}
            >
              <div
                mix={css({
                  display: 'grid',
                  gap: theme.space.lg,
                })}
              >
                <h1
                  mix={css({
                    margin: 0,
                    fontSize: '56px',
                    lineHeight: 1.02,
                    '@media (max-width: 620px)': {
                      fontSize: '38px',
                    },
                  })}
                >
                  {contactPageContent.heading}
                </h1>
                <p
                  mix={css({
                    margin: 0,
                    maxWidth: '34rem',
                    color: theme.colors.text.secondary,
                    fontSize: theme.fontSize.lg,
                    lineHeight: theme.lineHeight.relaxed,
                  })}
                >
                  {contactPageContent.body}
                </p>
              </div>

              <div
                mix={css({
                  display: 'grid',
                  gap: '12px',
                  paddingTop: '8px',
                  borderTop: `1px solid ${theme.colors.border.subtle}`,
                })}
              >
                <h2
                  mix={css({
                    margin: 0,
                    fontSize: theme.fontSize.lg,
                  })}
                >
                  {contactPageContent.directEmailLabel}
                </h2>
                <p
                  mix={css({
                    margin: 0,
                    color: theme.colors.text.secondary,
                    lineHeight: theme.lineHeight.relaxed,
                  })}
                >
                  {contactPageContent.directEmailBody}{' '}
                  <a
                    href={`mailto:${site.email}`}
                    mix={css({
                      color: theme.colors.text.link,
                      fontWeight: theme.fontWeight.semibold,
                    })}
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </section>

            <aside
              mix={css({
                display: 'grid',
                gap: theme.space.md,
                padding: '24px',
                borderRadius: theme.radius.xl,
                border: `1px solid ${theme.colors.border.subtle}`,
                background: 'rgba(0, 0, 0, 0.18)',
              })}
            >
              <div
                mix={css({
                  display: 'grid',
                  gap: theme.space.sm,
                })}
              >
                <h2
                  mix={css({
                    margin: 0,
                    fontSize: '24px',
                    lineHeight: 1.08,
                  })}
                >
                  {contactPageContent.socialHeading}
                </h2>
                <p
                  mix={css({
                    margin: 0,
                    color: theme.colors.text.secondary,
                    lineHeight: theme.lineHeight.relaxed,
                  })}
                >
                  {contactPageContent.socialBody}
                </p>
              </div>

              <div
                mix={css({
                  display: 'grid',
                  gap: theme.space.md,
                })}
              >
                {socials.map((item) => (
                  <FooterLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
            </aside>
          </div>

          <section
            mix={[
              cardStyles,
              css({
                display: 'grid',
                gap: theme.space.md,
                background: 'rgba(255, 255, 255, 0.03)',
              }),
            ]}
          >
            <div
              mix={css({
                display: 'grid',
                gap: theme.space.sm,
              })}
            >
              <h2
                mix={css({
                  margin: 0,
                  fontSize: '30px',
                  lineHeight: 1.08,
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
              action={formAction}
              method='POST'
              mix={css({
                display: 'grid',
                gap: '18px',
              })}
            >
              {renderSubmissionNotice(submission)}

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
        </div>
      </section>
    </Layout>
  )
}
