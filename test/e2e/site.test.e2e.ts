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
    await page.getByLabel('Name').fill('Alex Johnson')
    await page.getByLabel('Email address').fill('alex@example.com')
    await page.getByLabel('Message').fill('Too short')
    await page
      .locator('input[name="loadedAt"]')
      .evaluate((input) => ((input as HTMLInputElement).value = String(Date.now() - 5000)))
    await page.getByRole('button', { name: 'Send message' }).click()

    await page.getByRole('alert').waitFor()

    assert.match(
      (await page.getByRole('alert').textContent()) ?? '',
      /Please enter a more detailed message/,
    )
    assert.equal(await page.locator('input[name="name"]').inputValue(), 'Alex Johnson')
    assert.equal(await page.locator('input[name="email"]').inputValue(), 'alex@example.com')
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
