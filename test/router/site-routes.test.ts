import * as assert from 'remix/assert'
import { describe, it } from 'remix/test'

import { MIN_SUBMIT_TIME_MS } from '../../app/controllers/contact/form.ts'
import { projects } from '../../app/data/projects.ts'
import { router } from '../../app/router.ts'
import { routes } from '../../app/routes.ts'

const requestUrl = (path: string) => `http://localhost${path}`

const fetchPath = (path: string, init?: RequestInit) =>
  router.fetch(new Request(requestUrl(path), init))

const contactBody = (overrides: Partial<Record<string, string>> = {}) => {
  const body = new URLSearchParams({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    message: 'I need help building a sharper portfolio site with a reliable contact flow.',
    honeypot: '',
    loadedAt: String(Date.now() - MIN_SUBMIT_TIME_MS - 100),
    ...overrides,
  })

  return body
}

describe('project routes', () => {
  it('serves the projects index and project detail pages from the route contract', async () => {
    const indexResponse = await fetchPath(routes.projects.index.href())
    const indexHtml = await indexResponse.text()

    assert.equal(indexResponse.status, 200)
    assert.match(indexHtml, /Projects - Alex Johnson/)
    assert.match(indexHtml, /and 1 more/)

    const firstProject = projects[0]
    const detailResponse = await fetchPath(
      routes.projects.show.href({ projectRoute: firstProject.route }),
    )

    assert.equal(detailResponse.status, 200)
    assert.match(await detailResponse.text(), new RegExp(firstProject.name))
  })

  it('returns 404 for unknown and retired project URLs', async () => {
    const missingProjectResponse = await fetchPath(
      routes.projects.show.href({ projectRoute: 'missing-project' }),
    )
    const retiredWorkResponse = await fetchPath('/work')
    const missingProjectHtml = await missingProjectResponse.text()
    const retiredWorkHtml = await retiredWorkResponse.text()

    assert.equal(missingProjectResponse.status, 404)
    assert.match(missingProjectHtml, /Looks like this page slipped away/)
    assert.doesNotMatch(missingProjectHtml, /Requested path/)
    assert.equal(retiredWorkResponse.status, 404)
    assert.match(retiredWorkHtml, /Looks like this page slipped away/)
    assert.doesNotMatch(retiredWorkHtml, /Requested path/)
  })
})

describe('contact route', () => {
  it('redirects successful form submissions in demo mode', async () => {
    const originalDemoMode = process.env.CONTACT_DEMO_MODE
    process.env.CONTACT_DEMO_MODE = 'true'

    try {
      const response = await fetchPath(routes.contact.index.href(), {
        method: 'POST',
        body: contactBody(),
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-real-ip': `test-success-${Date.now()}`,
        },
      })

      assert.equal(response.status, 303)
      assert.match(response.headers.get('location') ?? '', /\/contact\?sent=1/)
    } finally {
      if (originalDemoMode === undefined) {
        delete process.env.CONTACT_DEMO_MODE
      } else {
        process.env.CONTACT_DEMO_MODE = originalDemoMode
      }
    }
  })

  it('renders success and validation states as HTML responses', async () => {
    const successResponse = await fetchPath(`${routes.contact.index.href()}?sent=1`)

    assert.equal(successResponse.status, 200)
    assert.match(await successResponse.text(), /Email sent successfully/)

    const invalidResponse = await fetchPath(routes.contact.index.href(), {
      method: 'POST',
      body: contactBody({ message: 'Too short' }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-real-ip': `test-invalid-${Date.now()}`,
      },
    })

    const invalidHtml = await invalidResponse.text()

    assert.equal(invalidResponse.status, 400)
    assert.match(invalidHtml, /Please enter a more detailed message/)
    assert.match(invalidHtml, /value="Alex Johnson"/)
    assert.match(invalidHtml, /value="alex@example.com"/)
    assert.match(invalidHtml, /Too short/)
  })
})

describe('asset route', () => {
  it('serves only allowed app and Remix browser modules', async () => {
    const clientEntryResponse = await fetchPath('/assets/app/assets/entry.ts')
    const remixUiResponse = await fetchPath('/assets/node_modules/remix/dist/ui.js')
    const serverOnlyResponse = await fetchPath(
      '/assets/app/controllers/contact/send-contact-email.ts',
    )

    assert.equal(clientEntryResponse.status, 200)
    assert.match(clientEntryResponse.headers.get('content-type') ?? '', /javascript/)
    assert.equal(remixUiResponse.status, 200)
    assert.match(remixUiResponse.headers.get('content-type') ?? '', /javascript/)
    assert.equal(serverOnlyResponse.status, 404)
  })
})
