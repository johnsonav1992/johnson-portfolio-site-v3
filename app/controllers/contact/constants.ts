import { routes } from '../../routes.ts'

export const contactFormAnchorId = 'contact-form'
export const contactFormHash = `#${contactFormAnchorId}`
export const contactFormAction = `${routes.contact.action.href()}${contactFormHash}`
export const contactFormSectionClientEntry =
  'app/controllers/contact/contact-form-section/contact-form-section.tsx#ContactFormSection'
export const contactFormFrameName = contactFormAnchorId
export const contactFormUrlHeader = 'x-contact-form-url'
