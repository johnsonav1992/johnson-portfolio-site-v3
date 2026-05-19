import * as assert from 'remix/assert'
import { createTestServer } from 'remix/node-fetch-server/test'
import { describe, it, type TestContext } from 'remix/test'

import { router } from '../../app/router.ts'
import { routes } from '../../app/routes.ts'

const serveApp = async (t: TestContext) =>
  t.serve(await createTestServer((request) => router.fetch(request)))

describe('site e2e', () => {
  it('navigates from home to projects without failed browser requests', async (t) => {
    const page = await serveApp(t)
    const failedRequests: string[] = []

    page.on('requestfailed', (request) => failedRequests.push(request.url()))

    await page.goto(routes.home.href())
    await page.getByRole('heading', { name: 'Alex Johnson' }).waitFor()
    await page.getByRole('link', { exact: true, name: 'Projects' }).click()
    await page
      .getByRole('heading', { name: 'Practical web apps, product sites, and tools.' })
      .waitFor()

    assert.equal(new URL(page.url()).pathname, routes.projects.index.href())
    assert.deepEqual(failedRequests, [])
  })

  it('opens a project detail page and returns to the projects index', async (t) => {
    const page = await serveApp(t)

    await page.goto(routes.projects.index.href())
    await page.getByRole('link', { name: 'View Dupre Music Designs project details' }).click()
    await page.getByRole('heading', { name: 'Dupre Music Designs' }).waitFor()

    assert.equal(
      new URL(page.url()).pathname,
      routes.projects.show.href({ projectRoute: 'dupre-music-designs' }),
    )

    await page.getByRole('link', { name: 'Back to Projects' }).click()
    await page
      .getByRole('heading', { name: 'Practical web apps, product sites, and tools.' })
      .waitFor()

    assert.equal(new URL(page.url()).pathname, routes.projects.index.href())
  })

  it('renders contact validation errors and preserves entered values', async (t) => {
    const page = await serveApp(t)

    await page.goto(routes.contact.index.href())
    await page.waitForLoadState('networkidle')
    await page.getByLabel('Name').fill('Alex Johnson')
    await page.getByLabel('Email address').fill('alex@example.com')
    await page.getByLabel('Message').fill('Too short')
    await page
      .locator('input[name="loadedAt"]')
      .evaluate((input) => ((input as HTMLInputElement).value = String(Date.now() - 5000)))
    await page.getByRole('button', { name: 'Send message' }).click()

    await page.getByRole('alert').waitFor()

    assert.equal(new URL(page.url()).hash, '#contact-form')
    assert.match(
      (await page.getByRole('alert').textContent()) ?? '',
      /Please enter a more detailed message/,
    )
    assert.equal(await page.locator('input[name="name"]').inputValue(), 'Alex Johnson')
    assert.equal(await page.locator('input[name="email"]').inputValue(), 'alex@example.com')
  })

  it('submits contact success inside the contact frame', async (t) => {
    const originalDemoMode = process.env.CONTACT_DEMO_MODE
    process.env.CONTACT_DEMO_MODE = 'true'

    try {
      const page = await serveApp(t)
      const navigationRequests: string[] = []
      let releasePost: (() => void) | undefined
      let markPostReached: (() => void) | undefined
      const postReached = new Promise<void>((resolve) => {
        markPostReached = resolve
      })

      await page.route('**/contact', async (route) => {
        if (route.request().method() === 'POST') {
          markPostReached?.()
          await new Promise<void>((resolve) => {
            releasePost = resolve
          })
        }

        await route.continue()
      })

      await page.goto(routes.contact.index.href())
      await page.waitForLoadState('networkidle')
      page.on('request', (request) => {
        if (request.isNavigationRequest()) {
          navigationRequests.push(`${request.method()} ${request.url()}`)
        }
      })

      await page.getByLabel('Name').fill('Alex Johnson')
      await page.getByLabel('Email address').fill('alex@example.com')
      await page
        .getByLabel('Message')
        .fill('I need help building a faster contact flow for my portfolio site.')
      await page
        .locator('input[name="loadedAt"]')
        .evaluate((input) => ((input as HTMLInputElement).value = String(Date.now() - 5000)))
      const click = page.getByRole('button', { name: 'Send message' }).click()

      await page.getByRole('button', { name: 'Sending...' }).waitFor()
      assert.equal(await page.getByRole('button', { name: 'Sending...' }).isDisabled(), true)
      await postReached
      releasePost?.()
      await click
      await page.getByRole('status').waitFor()

      const url = new URL(page.url())

      assert.equal(url.pathname, routes.contact.index.href())
      assert.equal(url.search, '?sent=1')
      assert.equal(url.hash, '#contact-form')
      assert.match((await page.getByRole('status').textContent()) ?? '', /Email sent successfully/)
      assert.deepEqual(navigationRequests, [])
    } finally {
      if (originalDemoMode === undefined) {
        delete process.env.CONTACT_DEMO_MODE
      } else {
        process.env.CONTACT_DEMO_MODE = originalDemoMode
      }
    }
  })

  it('serves the tools page client assets and tool links', async (t) => {
    const page = await serveApp(t)
    const failedRequests: string[] = []

    page.on('requestfailed', (request) => failedRequests.push(request.url()))

    await page.goto(routes.tools.href())
    const reactLink = page.getByRole('link', { name: 'React website' })

    await reactLink.waitFor()

    assert.equal(await reactLink.getAttribute('href'), 'https://react.dev/')
    assert.equal(
      await page.getByRole('link', { name: 'Remix framework website' }).getAttribute('href'),
      'https://remix.run/',
    )
    assert.deepEqual(failedRequests, [])
    await page.waitForLoadState('networkidle')
  })
})
