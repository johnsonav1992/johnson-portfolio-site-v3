import * as assert from 'remix/assert'
import { it } from 'remix/test'

import {
  getContactEmailSubject,
  renderContactEmailHtml,
} from '../../../app/controllers/contact/contact-email-template.server.ts'

it('renders escaped contact email markup and subject text', () => {
  const html = renderContactEmailHtml({
    name: 'Alex <Johnson>',
    email: 'alex@example.com',
    message: 'Hello <script>alert("x")</script>\nSecond line',
  })

  assert.equal(
    getContactEmailSubject({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      message: 'Hello',
    }),
    'New project inquiry from Alex Johnson - alex@example.com',
  )
  assert.match(html, /New project inquiry/)
  assert.match(html, /Alex &lt;Johnson&gt;/)
  assert.match(html, /Hello &lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;<br>Second line/)
})
