import type { Controller } from 'remix/fetch-router'
import { redirect } from 'remix/response/redirect'

import type { routes } from '../../routes.ts'
import { render } from '../../utils/render.tsx'
import {
  contactMessages,
  extractContactData,
  toContactFormValues,
  type ContactResult,
  validateContactData,
} from './form.ts'
import { sendContactEmail } from './send-contact-email.ts'
import { ContactPage } from './page.tsx'

const RATE_LIMIT_WINDOW_MS = 60 * 1000
const rateLimitMap = new Map<string, number>()

const getContactIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
  request.headers.get('x-real-ip') ??
  'unknown'

interface RenderContactPageOptions {
  status?: number
  submission?: ContactResult
  values?: ReturnType<typeof toContactFormValues>
}

const renderContactPage = (
  request: Request,
  { status, submission, values }: RenderContactPageOptions = {},
) =>
  render(
    <ContactPage
      loadedAt={Date.now()}
      submission={submission}
      values={values}
    />,
    request,
    status ? { status } : undefined,
  )

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
      return renderContactPage(request, {
        submission: getSuccessSubmission(request),
      })
    },
    async action({ request }) {
      const ip = getContactIp(request)
      const lastSubmit = rateLimitMap.get(ip)

      if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_WINDOW_MS) {
        return renderContactPage(request, {
          status: 429,
          submission: {
            type: 'error',
            message: contactMessages.rateLimited,
          },
        })
      }

      const formData = await request.formData()
      const contactData = extractContactData(formData)
      const values = toContactFormValues(contactData)
      const validationError = validateContactData(contactData)

      if (validationError) {
        return renderContactPage(request, {
          status: 400,
          submission: {
            type: 'error',
            message: validationError,
          },
          values,
        })
      }

      try {
        await sendContactEmail(contactData)
        rateLimitMap.set(ip, Date.now())

        const successUrl = new URL(request.url)
        successUrl.searchParams.set('sent', '1')
        return redirect(successUrl.toString(), 303)
      } catch (error) {
        console.error('Contact form error:', error)

        return renderContactPage(request, {
          status: 500,
          submission: {
            type: 'error',
            message: contactMessages.genericError,
          },
          values,
        })
      }
    },
  },
} satisfies Controller<typeof routes.contact>
