import nodemailer from 'nodemailer'

import { type ContactData, escapeHtml } from './form.ts'

const DEFAULT_EMAIL_TIMEOUT_MS = 8000

const getMailCredentials = () => {
  const user = process.env.GMAIL_EMAIL
  const pass = process.env.GMAIL_PASS

  if (!user || !pass) {
    throw new Error('Missing GMAIL_EMAIL or GMAIL_PASS environment variables.')
  }

  return { user, pass }
}

const getEmailTimeoutMs = () => {
  const timeout = Number(process.env.CONTACT_EMAIL_TIMEOUT_MS)

  if (Number.isFinite(timeout) && timeout > 0) {
    return timeout
  }

  return DEFAULT_EMAIL_TIMEOUT_MS
}

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeout: NodeJS.Timeout | undefined

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => {
          reject(new Error(`Email send timed out after ${timeoutMs}ms.`))
        }, timeoutMs)
        timeout.unref()
      }),
    ])
  } finally {
    if (timeout) {
      clearTimeout(timeout)
    }
  }
}

const getEmailSubject = (name: string, email: string) => `Message received from ${name} - ${email}`

const getEmailHtml = ({
  name,
  email,
  message,
}: Pick<ContactData, 'name' | 'email' | 'message'>) => `
  <h1>New AJ Web Development Contact Form Submission</h1>
  <h2>From ${escapeHtml(name)} - ${escapeHtml(email)}</h2>
  <h3>Message:</h3>
  <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
`

export const sendContactEmail = async ({
  name,
  email,
  message,
}: Pick<ContactData, 'name' | 'email' | 'message'>): Promise<void> => {
  if (process.env.CONTACT_DEMO_MODE === 'true') {
    return
  }

  const { user, pass } = getMailCredentials()
  const timeoutMs = getEmailTimeoutMs()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    connectionTimeout: timeoutMs,
    greetingTimeout: timeoutMs,
    socketTimeout: timeoutMs,
    auth: {
      user,
      pass,
    },
  })

  try {
    await withTimeout(
      transporter.sendMail({
        from: user,
        sender: user,
        to: user,
        replyTo: email,
        subject: getEmailSubject(name, email),
        html: getEmailHtml({ name, email, message }),
      }),
      timeoutMs,
    )
  } finally {
    transporter.close()
  }
}
