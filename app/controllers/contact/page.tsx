import { css } from 'remix/ui'
import { contactPageContent } from '../../data/site.ts'
import { routes } from '../../routes.ts'
import { sectionWrap } from '../../theme/styles.ts'
import { Layout } from '../../ui/layout.tsx'
import { SectionLabel } from '../../ui/section-label/section-label.tsx'
import { ContactFormSection } from './contact-form-section/contact-form-section.tsx'
import { ContactOverviewCard } from './contact-overview-card/contact-overview-card.tsx'
import type { ContactFormValues, ContactResult } from './form.ts'
import { SocialLinksCard } from './social-links-card/social-links-card.tsx'

const formAction = routes.contact.action.href()

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
            gap: '28px',
            padding: '64px 0 88px',
            '@media (max-width: 720px)': {
              gap: '20px',
              padding: '48px 0 64px',
            },
          }),
        ]}
      >
        <div
          mix={css({
            width: '100%',
            maxWidth: '840px',
            margin: '0 auto',
            display: 'grid',
            gap: '18px',
          })}
        >
          <SectionLabel>{contactPageContent.eyebrow}</SectionLabel>
          <ContactOverviewCard />
          <ContactFormSection
            action={formAction}
            loadedAt={loadedAt}
            submission={submission}
            values={values}
          />
          <SocialLinksCard />
        </div>
      </section>
    </Layout>
  )
}
