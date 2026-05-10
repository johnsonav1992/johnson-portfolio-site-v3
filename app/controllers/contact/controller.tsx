import type { Controller } from 'remix/fetch-router'
import { redirect } from 'remix/response/redirect'

import type { routes } from '../../routes.ts'
import { noStoreHeaders } from '../../utils/cache.ts'
import { render } from '../../utils/render.tsx'
import {
  type ContactResult,
  contactMessages,
  extractContactData,
  parseContactFormData,
  toContactFormValues,
} from './form.ts'
import { ContactPage } from './page.tsx'
import { sendContactEmail } from './send-contact-email.ts'

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
    {
      ...(status ? { status } : {}),
      ...(submission || values ? { headers: noStoreHeaders } : {}),
    },
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
    async action({ get, request }) {
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

      const formData = get(FormData)
      const parsed = parseContactFormData(formData)

      if (!parsed.success) {
        const values = toContactFormValues(extractContactData(formData))

        return renderContactPage(request, {
          status: 400,
          submission: {
            type: 'error',
            message: parsed.issues[0]?.message ?? contactMessages.genericError,
          },
          values,
        })
      }

      const contactData = parsed.value
      const values = toContactFormValues(contactData)

      try {
        await sendContactEmail(contactData)
        rateLimitMap.set(ip, Date.now())

        const successUrl = new URL(request.url)
        successUrl.searchParams.set('sent', '1')
        return redirect(successUrl.toString(), {
          status: 303,
          headers: noStoreHeaders,
        })
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
