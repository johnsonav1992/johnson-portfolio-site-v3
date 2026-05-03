import { form, get, route } from 'remix/fetch-router/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  contact: form('/contact'),
  tools: get('/tools'),
  work: {
    index: get('/work'),
    show: get('/work/:projectRoute'),
  },
})
