import { form, get, route } from 'remix/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  contact: form('/contact'),
  tools: get('/tools'),
  projects: {
    index: get('/projects'),
    show: get('/projects/:projectRoute'),
  },
})
