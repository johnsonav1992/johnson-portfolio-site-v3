import type { ContactEmailPayload } from './types.ts'

const brandName = 'AJ Web Development'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

const formatMessageHtml = (message: string) =>
  escapeHtml(message)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, '<br>'))
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join('')

export const getContactEmailSubject = ({ email, name }: ContactEmailPayload) =>
  `New project inquiry from ${name} - ${email}`

export const renderContactEmailHtml = ({ email, message, name }: ContactEmailPayload) => {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const initials = escapeHtml(getInitials(name) || 'AJ')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New contact form submission</title>
  </head>
  <body style="margin:0; background:#111217; color:#f4f7fb; font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#111217; padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; overflow:hidden; border:1px solid rgba(255,255,255,0.12); border-radius:18px; background:#1b1d26;">
            <tr>
              <td style="padding:28px 30px; background:#20232e; border-bottom:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:12px; line-height:1.4; letter-spacing:0.08em; text-transform:uppercase; color:#83f7b0; font-weight:800;">${brandName}</div>
                <h1 style="margin:8px 0 0; color:#ffffff; font-size:28px; line-height:1.18;">New project inquiry</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="72" valign="top">
                      <div style="width:56px; height:56px; border-radius:16px; background:#4ea7ff; color:#08111c; display:inline-block; text-align:center; font-size:20px; line-height:56px; font-weight:900;">${initials}</div>
                    </td>
                    <td valign="top">
                      <div style="color:#a8b0c2; font-size:13px; line-height:1.5; font-weight:700; text-transform:uppercase; letter-spacing:0.06em;">From</div>
                      <div style="margin-top:4px; color:#ffffff; font-size:20px; line-height:1.35; font-weight:800;">${safeName}</div>
                      <a href="mailto:${safeEmail}" style="display:inline-block; margin-top:6px; color:#83f7b0; font-size:15px; line-height:1.5; text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>
                <div style="height:1px; margin:28px 0; background:rgba(255,255,255,0.1);"></div>
                <div style="color:#a8b0c2; font-size:13px; line-height:1.5; font-weight:700; text-transform:uppercase; letter-spacing:0.06em;">Message</div>
                <div style="margin-top:10px; color:#f4f7fb; font-size:16px; line-height:1.7;">
                  ${formatMessageHtml(message)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px; background:#171922; border-top:1px solid rgba(255,255,255,0.1); color:#a8b0c2; font-size:13px; line-height:1.5;">
                Reply directly to this email to respond to ${safeName}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
