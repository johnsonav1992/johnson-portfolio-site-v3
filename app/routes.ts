import { get, route } from 'remix/fetch-router/routes'

export const routes = route({
  assets: get('/assets/*path'),
  home: '/',
  tools: get('/tools'),
  work: {
    index: get('/work'),
    show: get('/work/:projectRoute'),
  },
})
