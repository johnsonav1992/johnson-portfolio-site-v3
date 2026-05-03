import nodemailer from 'nodemailer'

import { escapeHtml, type ContactData } from './contact.ts'

const getMailCredentials = () => {
  const user = process.env.GMAIL_EMAIL
  const pass = process.env.GMAIL_PASS

  if (!user || !pass) {
    throw new Error('Missing GMAIL_EMAIL or GMAIL_PASS environment variables.')
  }

  return { user, pass }
}

export const sendContactEmail = async ({
  name,
  email,
  message,
}: Pick<ContactData, 'name' | 'email' | 'message'>): Promise<void> => {
  const { user, pass } = getMailCredentials()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  })

  await transporter.sendMail({
    from: user,
    sender: user,
    to: user,
    replyTo: email,
    subject: `Message received from ${name} - ${email}`,
    html: `
      <h1>New AJ Web Development Contact Form Submission</h1>
      <h2>From ${escapeHtml(name)} - ${escapeHtml(email)}</h2>
      <h3>Message:</h3>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  })
}
