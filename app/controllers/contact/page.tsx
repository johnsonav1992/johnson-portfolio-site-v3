import { css, Frame, type Handle } from 'remix/ui'
import { sectionWrap } from '../../theme/styles.ts'
import { Layout } from '../../ui/layout.tsx'
import { SectionLabel } from '../../ui/section-label/section-label.tsx'
import { contactFormFrameName } from './constants.ts'
import { ContactOverviewCard } from './contact-overview-card/contact-overview-card.tsx'
import { contactPageContent } from './content.ts'
import { SocialLinksCard } from './social-links-card/social-links-card.tsx'

export interface ContactPageProps {
  formSrc: string
}

export const ContactPage = (handle: Handle<ContactPageProps>) => {
  return () => {
    const { formSrc } = handle.props

    return (
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
            <Frame
              name={contactFormFrameName}
              src={formSrc}
            />
            <SocialLinksCard />
          </div>
        </section>
      </Layout>
    )
  }
}
