import nodemailer from 'nodemailer'

import { type ContactData, escapeHtml } from './form.ts'

const DEFAULT_EMAIL_TIMEOUT_MS = 8000
const DEFAULT_RESEND_FROM_EMAIL = 'AJ Web Development <onboarding@resend.dev>'

const getMailCredentials = () => {
  const user = process.env.GMAIL_EMAIL
  const pass = process.env.GMAIL_PASS

  if (!user || !pass) {
    throw new Error('Missing GMAIL_EMAIL or GMAIL_PASS environment variables.')
  }

  return { user, pass }
}

const getContactRecipient = () => process.env.CONTACT_TO_EMAIL ?? process.env.GMAIL_EMAIL

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

const sendContactEmailWithResend = async ({
  name,
  email,
  message,
}: Pick<ContactData, 'name' | 'email' | 'message'>): Promise<void> => {
  const apiKey = process.env.RESEND_API_KEY
  const to = getContactRecipient()

  if (!apiKey || !to) {
    throw new Error('Missing RESEND_API_KEY or contact recipient environment variable.')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_RESEND_FROM_EMAIL,
      to,
      reply_to: email,
      subject: getEmailSubject(name, email),
      html: getEmailHtml({ name, email, message }),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Resend email failed with ${response.status}: ${errorText}`)
  }
}

export const sendContactEmail = async ({
  name,
  email,
  message,
}: Pick<ContactData, 'name' | 'email' | 'message'>): Promise<void> => {
  if (process.env.RESEND_API_KEY) {
    await sendContactEmailWithResend({ name, email, message })
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
