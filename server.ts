import { existsSync } from 'node:fs'
import * as http from 'node:http'
import { loadEnvFile } from 'node:process'

import { createRequestListener } from 'remix/node-fetch-server'

if (process.env.NODE_ENV !== 'production' && existsSync('.env')) {
  loadEnvFile('.env')
}

const contactEnvKeys = ['GMAIL_EMAIL', 'GMAIL_PASS'] as const
const missingContactEnvKeys = contactEnvKeys.filter((key) => !process.env[key])
const contactEmailProvider = process.env.RESEND_API_KEY ? 'resend' : 'gmail-smtp'

if (contactEmailProvider === 'resend') {
  console.log('Contact email provider configured: Resend')
} else if (missingContactEnvKeys.length > 0) {
  console.warn(`Contact email env missing: ${missingContactEnvKeys.join(', ')}`)
} else {
  console.log('Contact email env configured: GMAIL_EMAIL, GMAIL_PASS')
}

const { router } = await import('./app/router.ts')

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 44100

const server = http.createServer(
  createRequestListener(async (request) => {
    try {
      return await router.fetch(request)
    } catch (error) {
      console.error(error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }),
)

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

let shuttingDown = false

const shutdown = () => {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  server.close(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
