import type { Controller } from 'remix/fetch-router'

import { routes } from '../../routes.ts'
import type { AppRequestContext } from '../../types/router.ts'
import { noStoreHeaders } from '../../utils/cache.ts'
import { render } from '../../utils/render.tsx'
import {
  contactFormAction,
  contactFormFrameName,
  contactFormHash,
  contactFormUrlHeader,
} from './constants.ts'
import { ContactFormSection } from './contact-form-section/contact-form-section.tsx'
import { contactMessages } from './content.ts'
import { ContactPage } from './page.tsx'
import { sendContactEmail } from './send-contact-email.server.ts'
import {
  extractContactData,
  parseContactFormData,
  toContactFormValues,
} from './submission.server.ts'
import type { ContactFormValues, ContactResult } from './types.ts'

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const rateLimitMap = new Map<string, number>()

const getContactIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  request.headers.get('x-real-ip') ??
  'unknown'

const emptyFormValues = toContactFormValues({})

interface RenderContactPageOptions {
  noStore?: boolean
  status?: number
  submission?: ContactResult
  values?: ContactFormValues
}

const isContactFormFrameRequest = (request: Request) =>
  request.headers.get('x-remix-target') === contactFormFrameName

const getContactFormFrameSrc = (request: Request) => {
  const url = new URL(request.url)
  return `${routes.contact.index.href()}${url.search}`
}

const renderContactPage = (request: Request, { noStore, status }: RenderContactPageOptions = {}) =>
  render(<ContactPage formSrc={getContactFormFrameSrc(request)} />, request, {
    ...(noStore ? { headers: noStoreHeaders } : {}),
    ...(status ? { status } : {}),
  })

const renderContactFormFrame = (
  request: Request,
  { status, submission, values }: RenderContactPageOptions = {},
) =>
  render(
    <ContactFormSection
      action={contactFormAction}
      loadedAt={Date.now()}
      submission={submission}
      values={values ?? emptyFormValues}
    />,
    request,
    {
      ...(status ? { status } : {}),
      ...(submission || values ? { headers: noStoreHeaders } : {}),
    },
  )

const withContactFormUrl = (response: Response, url: string) => {
  response.headers.set(contactFormUrlHeader, url)
  return response
}

const getSuccessSubmission = (request: Request): ContactResult | undefined => {
  const url = new URL(request.url)

  if (url.searchParams.get('sent') !== '1') {
    return undefined
  }

  return {
    type: 'success',
    message: contactMessages.success,
  }
}

export const contact = {
  actions: {
    index({ request }) {
      const successSubmission = getSuccessSubmission(request)

      if (isContactFormFrameRequest(request)) {
        return renderContactFormFrame(request, {
          submission: successSubmission,
        })
      }

      return renderContactPage(request, {
        noStore: !!successSubmission,
      })
    },
    async action({ get, request }) {
      const ip = getContactIp(request)
      const lastSubmit = rateLimitMap.get(ip)

      if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW_MS) {
        return withContactFormUrl(
          renderContactFormFrame(request, {
            status: 429,
            submission: {
              type: 'error',
              message: contactMessages.rateLimited,
            },
          }),
          `${routes.contact.index.href()}${contactFormHash}`,
        )
      }

      const formData = get(FormData)
      const parsed = parseContactFormData(formData)

      if (!parsed.success) {
        const values = toContactFormValues(extractContactData(formData))

        return withContactFormUrl(
          renderContactFormFrame(request, {
            status: 400,
            submission: {
              type: 'error',
              message: parsed.issues[0]?.message ?? contactMessages.genericError,
            },
            values,
          }),
          `${routes.contact.index.href()}${contactFormHash}`,
        )
      }

      const contactData = parsed.value
      const values = toContactFormValues(contactData)

      try {
        await sendContactEmail(contactData)
        rateLimitMap.set(ip, Date.now())

        return withContactFormUrl(
          renderContactFormFrame(request, {
            submission: {
              type: 'success',
              message: contactMessages.success,
            },
          }),
          `${routes.contact.index.href()}?sent=1${contactFormHash}`,
        )
      } catch (error) {
        console.error('Contact form error:', error)

        return withContactFormUrl(
          renderContactFormFrame(request, {
            status: 500,
            submission: {
              type: 'error',
              message: contactMessages.genericError,
            },
            values,
          }),
          `${routes.contact.index.href()}${contactFormHash}`,
        )
      }
    },
  },
} satisfies Controller<typeof routes.contact, AppRequestContext>
