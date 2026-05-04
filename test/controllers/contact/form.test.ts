import * as assert from 'remix/assert'
import { it } from 'remix/test'

import {
  extractContactData,
  MIN_SUBMIT_TIME_MS,
  validateContactData,
} from '../../../app/controllers/contact/form.ts'

it('extractContactData trims fields and strips newlines from name and email', () => {
  const formData = new FormData()
  formData.set('name', ' Alex\nJohnson ')
  formData.set('email', '\n alex@example.com \r')
  formData.set('message', '  Need help building a new app with a cleaner UX.  ')
  formData.set('loadedAt', String(Date.now() - MIN_SUBMIT_TIME_MS - 100))

  assert.deepEqual(extractContactData(formData), {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    message: 'Need help building a new app with a cleaner UX.',
    honeypot: '',
    loadedAt: Number(formData.get('loadedAt')),
  })
})

it('validateContactData accepts a well-formed submission', () => {
  assert.equal(
    validateContactData({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      message: 'I need help improving an existing product site and contact flow.',
      honeypot: '',
      loadedAt: Date.now() - MIN_SUBMIT_TIME_MS - 100,
    }),
    null,
  )
})

it('validateContactData rejects rapid submissions and spam patterns', () => {
  assert.equal(
    validateContactData({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      message: 'I need help improving an existing product site and contact flow.',
      honeypot: '',
      loadedAt: Date.now() - 1000,
    }),
    'Please take a moment to fill out the form.',
  )

  assert.equal(
    validateContactData({
      name: 'Lottery Winner',
      email: 'alex@example.com',
      message: 'Click here to win the contract and make money fast with free money now.',
      honeypot: '',
      loadedAt: Date.now() - MIN_SUBMIT_TIME_MS - 100,
    }),
    'Your message appears to contain spam. Please revise and try again.',
  )
})
